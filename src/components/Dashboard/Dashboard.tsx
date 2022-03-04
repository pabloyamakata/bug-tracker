import { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';

import { CustomPaper } from './DashboardStyles';
import Typography from '@mui/material/Typography';

const bugs_URL = 'http://localhost/bug-tracker-backend/bugs.php';
const projects_URL = 'http://localhost/bug-tracker-backend/projects.php';

interface BugInterface {
    id: number;
    name: string;
    description: string;
    project: string;
    project_leader: string;
    current_status: string;
    priority_level: string;
    severity_level: string;
    initial_date: Date;
    final_date: Date;
}

interface ProjectInterface {
    id: number;
    name: string;
    description: string;
    project_leader: string;
    start_date: Date;
    deadline: Date;
    current_status: string;
    frontend: string;
    backend: string;
    ddbb: string;
}

function Dashboard() {
    const { state: { username } } = useContext(AppContext);
    const [bugArray, setBugArray] = useState<BugInterface[]>([]);
    const [projectArray, setProjectArray] = useState<ProjectInterface[]>([]);

    useEffect(() => {
        const promiseForBugs = axios.get(bugs_URL, { withCredentials: true });
        const promiseForProjects = axios.get(projects_URL, { withCredentials: true });

        Promise.all([promiseForBugs, promiseForProjects])
        .then(res => {
            setBugArray(res[0].data);
            setProjectArray(res[1].data);
        });
    }, []);

    return(
        <CustomPaper elevation={0}>
            <Typography
            variant='h5' 
            sx={{marginLeft: '20px', paddingTop: '25px'}}>
                Welcome {username}!
            </Typography>
        </CustomPaper>
    )
}

export default Dashboard;