import { Route, Routes } from 'react-router-dom';
import CalenderPage from '../components/CalenderPage';
import Client from '../components/Client';
import Meetings from '../components/Meetings';
import DynamicMeetings from '../components/DynamicMeetings';

function AppRoutes() {
  return (
    <Routes>
        <Route path="/" Component={CalenderPage} />
        <Route path="/clients" Component={Client} />
        <Route path="/meetings" Component={Meetings} />
        <Route path="/meetings/:id" Component={DynamicMeetings} />
      </Routes>
  );
}

export default AppRoutes;