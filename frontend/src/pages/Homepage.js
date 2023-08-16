import OverviewBox from "../components/OverviewBox";
import './Homepage.css'
import React, { useEffect, useState } from "react";
import axios from 'axios';
import BucketList from "../components/BucketList";
import PublicList from "../components/PublicList";
import NonPublic from "../components/NonPublic";
import ObjectsList from "../components/ObjectsList";
import DonutChart from "../components/DonutChart";
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = "https://mayarhamed.pythonanywhere.com";
// const API_BASE_URL = "http://127.0.0.1:5000"

function Homepage() {

    const isAuthenticated = sessionStorage.getItem('logged_in');
    const navigate = useNavigate()

    const [objects, setObjects] = useState([])
    const [permissions, setPermissions] = useState([])
    const [buckets, setBuckets] = useState([])

    const [publicObj, setPublicObj] = useState([])
    const [nonPublicObj, setNonPublicObj] = useState([])

    const [isLoading, setIsLoading] = useState(true);

    const [categorizedObjects, setCategorizedObjects] = useState({})

    const [activeComponent, setActiveComponent] = useState(null);

    const [chartData, setChartData] = useState({})

    useEffect(() => {
        if (!isAuthenticated)
            navigate('/')
    })

    useEffect(() => {
        axios.get(`${API_BASE_URL}/objects`)
            .then((response) => {
                setObjects(response.data);
            })
            .catch((error) => {
                console.error("Error fetching objects:", error);
                setIsLoading(false);
            });

        axios.get(`${API_BASE_URL}/buckets`)
            .then((response) => {
                setBuckets(response.data);
            })
            .catch((error) => {
                console.error("Error fetching buckets:", error);
                setIsLoading(false);
            });

        axios.get(`${API_BASE_URL}/permissions`)
            .then((response) => {
                setPermissions(response.data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching permissions:", error);
                setIsLoading(false);
            });
    }, []);


    //to divide objects into public and non-public 
    useEffect(() => {
        if (permissions)
            categorize_permissions(permissions)
    }, [permissions]);

    //categorize the non-public by owner
    useEffect(() => {
        if (nonPublicObj) {
            const uniqueCategories = [...new Set(nonPublicObj.map(item => item.Owner))];
            const categorizedLists = {}
            uniqueCategories.forEach(category => {
                categorizedLists[category] = nonPublicObj.filter(item => item.Owner === category)
            });

            setCategorizedObjects(categorizedLists)
        }
    }, [nonPublicObj])

    //get chart data
    useEffect(() => {
        if (categorizedObjects)
            getChartData()
    }, [categorizedObjects])

    function isPublic(object) {
        return object.Permissions[0].Grantee.Type === "Group";
    }

    function categorize_permissions(permissions) {
        let publicObjects = [];
        let nonPublicObjects = [];

        permissions.forEach(obj => {
            if (isPublic(obj))
                publicObjects.push(obj)
            else
                nonPublicObjects.push(obj)
        });

        setPublicObj(publicObjects);
        setNonPublicObj(nonPublicObjects);
    }

    function handleComponentClick(component) {
        console.log(activeComponent, 'clicked')
        setActiveComponent(component);
    }

    function getChartData() {
        let data = {
            labels: Object.keys(categorizedObjects),
            datasets: [
                {
                    data: Object.keys(categorizedObjects).map(category => categorizedObjects[category].length),
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                    hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                },
            ],
        };
        setChartData(data);
    }

    return (
        <div className="container mt-5 homepage bg-dark">
            <div className="container box-container">
                {isLoading ? (
                    <div className="d-flex flex-column align-items-center">
                        <img src="R.gif" alt=""></img>
                        <p>Loading..</p>
                    </div>
                ) : (
                    <div className="container">
                        <div className="overview-row">
                            <div className="w-100 m-2" onClick={() => handleComponentClick('buckets')}>
                                <OverviewBox title={'Buckets'} count={buckets.length} />
                            </div>
                            <div className="w-100 m-2" onClick={() => handleComponentClick('objects')}>
                                <OverviewBox title={'Objects'} count={objects.length} />
                            </div>
                            <div className="w-100 m-2" onClick={() => handleComponentClick('public')} >
                                <OverviewBox title={'Public Objects'} count={publicObj.length} />
                            </div>
                            <div className="w-100 m-2" onClick={() => handleComponentClick('nonPublic')} >
                                <OverviewBox title={'Non-Public Objects'} count={nonPublicObj.length} />
                            </div>
                        </div>
                        {activeComponent === 'buckets' && <BucketList buckets={buckets} />}
                        {activeComponent === 'public' && <PublicList list={publicObj} />}
                        {activeComponent === 'nonPublic' && (
                            <div className="d-flex mt-5">
                                <NonPublic list={categorizedObjects} />
                                <DonutChart chartData={chartData} />
                            </div>
                        )}

                        {activeComponent === 'objects' && <ObjectsList objects={objects} />}

                    </div>

                )}
            </div>
        </div>
    )
}

export default Homepage;