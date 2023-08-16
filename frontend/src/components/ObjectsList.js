function ObjectsList({ objects }) {
    return (
        <div className="container">
            <h3 className="m-3">All Objects</h3>
            <div className="container m-3 w-75 card card-body rounded m-2">
                {objects && objects.length > 0 ? (
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Key</th>
                                <th>Bucket Name</th>
                                <th>Owner</th>
                                <th>Size</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                objects.map((object) => {
                                    return (
                                        <tr key={object.Key}>
                                            <td>{object.Key}</td>
                                            <td>{object.Bucket}</td>
                                            <td>{object.Owner}</td>
                                            <td>{object.Size}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                ) : (
                    <p className="mt-3">No Objects to view..</p>
                )}
            </div>
        </div>
    )
}

export default ObjectsList;