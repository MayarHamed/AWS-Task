function NonPublic(props) {
    // console.log(props.list)
    return (
        <div className="container">
            <div className="container m-2">
                <h3>Non-Public Objects</h3>
                <h5 className="mt-2">Categorized by Owner</h5>
                {Object.keys(props.list).length !== 0 ? (
                    Object.keys(props.list).map((owner) => {
                        return (
                            <div className="card mt-3 rounded m-2" key={owner} >
                                <div className="card-header">
                                    <h4>{owner}</h4>
                                </div>
                                <div className="card-body d-flex flex-wrap">
                                    {
                                        props.list[owner].map((object) => {
                                            return (
                                                <div className="card m-2 card-body" key={object.Key} >
                                                    <table className="table table-striped">
                                                        <thead>
                                                            <tr>
                                                                <th>Key</th>
                                                                <th>Bucket Name</th>
                                                                <th>Size</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr key={object.Key}>
                                                                <td>{object.Key}</td>
                                                                <td>{object.Bucket}</td>
                                                                <td>{object.Size}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        )
                    })
                ) : (
                    <p className="mt-3">No non-public objects to view..</p>
                )}

            </div>
        </div>
    )
}

export default NonPublic;