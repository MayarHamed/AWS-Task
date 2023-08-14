function BucketList({buckets}) {
    return (
        <div >
            <h3 className="m-3">Buckets</h3>
            <div className="container m-3 w-75 card card-body rounded m-2">
                {buckets && buckets.length > 0 ? (
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Creation Date</th>
                                <th>Bucket Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                buckets.map((bucket) => {
                                    return (
                                        <tr key={bucket.Name}>
                                            <td>{bucket.CreationDate}</td>
                                            <td>{bucket.Name}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                ) : (
                    <p className="mt-3">No Buckets to view..</p>
                )}
            </div>
        </div>
    )
}

export default BucketList;