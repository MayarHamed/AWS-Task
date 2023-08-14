function PublicList(props) {
    return (
        <div>
            <div className="container m-2">
                <h3>Public Objects</h3>
                {props.list.length > 0 ? (
                    <table className="table table-striped w-75 ">
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
                                props.list.map((object) => {
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
                    <p className="mt-3">No public objects to view..</p>
                )}

            </div>
        </div>
    )
}

export default PublicList;