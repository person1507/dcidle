export default function CompletedModal({ close }) {
    return (
        <div className="modal show d-block fade" tabIndex="-1" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Congratulations!</h5>
                    </div>
                    <div className="modal-body">
                        <p>You have figured out the correct corps!</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={close} data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
}