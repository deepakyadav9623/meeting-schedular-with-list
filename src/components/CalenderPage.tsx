import { Scheduler } from '@aldabil/react-scheduler';
import { EventActions, ProcessedEvent } from '@aldabil/react-scheduler/types';

function CalenderPage() {

  const handleConfirm = async (
    event: ProcessedEvent,
    action: EventActions
  ): Promise<ProcessedEvent> => {

    return new Promise((res, rej) => {
      if (action === "edit") {
        setTimeout(() => {
          const data = JSON.parse(localStorage.getItem("events") || "[]");

          const udpatedData = data.map((item: any) => {
            if (item.event_id === event.event_id) {
              return {
                ...item,
                title: event.title,
                clients: event.clients,
                Price: event.Price
              }
            }
            else {
              return item;
            }
          })

          localStorage.setItem("events", JSON.stringify(udpatedData));
          res({
            ...event,
            event: event
          });
        }, 2000);

      }
      if (action === "create") {
        /**POST event to remote DB */
        setTimeout(() => {
          const datas = JSON.parse(localStorage.getItem("events") || "[]");
          event.event_id = datas.length + 1;
          datas.push(event)
          localStorage.setItem("events", JSON.stringify(datas));
          res({
            ...event,
            event_id: datas.length
          });

        }, 2000);
      }
    });
  };
  const handleDelete = async (deletedId: string): Promise<string> => {
    return new Promise((res, rej) => {
      setTimeout(() => {
        const datas = JSON.parse(localStorage.getItem("events") || "[]");
        const abc = datas.filter((el: any) => el.event_id !== deletedId)
        localStorage.setItem("events", JSON.stringify(abc));
        res(deletedId);
      }, 2000);
    });
  };

  // parse the event data from local storage and convert the date format
  const eventData = JSON.parse(localStorage.getItem("events") || "[]").map((event: any) => {
    return {
      ...event,
      start: Date.parse(event.start),
      end: Date.parse(event.end)
    };
  });

  return (
    <>
      <Scheduler
        view="month"
        events={eventData}
        selectedDate={new Date(2023, 4, 5)}
        onConfirm={handleConfirm}
        onDelete={handleDelete}
        fields={[
          {
            name: "clients",
            type: "select",
            options: JSON.parse(localStorage.getItem("clients") || "[]"),
            config: { label: "Client", required: true, errMsg: "Plz Select client" }
          },
          {
            name: "Price",
            type: "input",
            config: { label: "Price", multiline: false, rows: 1, required: true, errMsg: "Plz Select price" }
          }
        ]}
      />
    </>
  );
}

export default CalenderPage;
