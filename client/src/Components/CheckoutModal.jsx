import React, { useState, useEffect } from 'react';
import "./CheckoutModal.css"; // We will create this or inline styles
import { useNavigate } from 'react-router-dom';

const CheckoutModal = ({ show, onClose, onPaymentComplete, user, itemName, price }) => {
    const navigate = useNavigate();
    const [processing, setProcessing] = useState(false);
    const [checkoutData, setCheckoutData] = useState({
        name: "",
        username: "",
        location: "",
        cc_num_field: "",
        cc_exp_field: "",
        cc_cvc_field: ""
    });

    useEffect(() => {
        if (user) {
            setCheckoutData(prev => ({ ...prev, username: user.username }));
        }
    }, [user]);

    const handleInputChange = (e) => {
        setCheckoutData({ ...checkoutData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);

        // Simulate processing delay
        setTimeout(async () => {
            setProcessing(false);
            await onPaymentComplete(checkoutData);
        }, 2000);
    };

    if (!show) return null;

    return (
        <div className="modal-overlay">
            <div className="checkout-modal">
                <h2>Secure Checkout</h2>
                {itemName && <p style={{ color: '#888', marginBottom: '15px' }}>Purchasing: <span style={{ color: 'white' }}>{itemName}</span></p>}

                <form onSubmit={handleSubmit} noValidate>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Full Name</label>
                            <input name="name" required value={checkoutData.name} onChange={handleInputChange} placeholder="Pixel Punch" />
                        </div>
                        <div className="form-group">
                            <label>Username</label>
                            <input name="username" readOnly value={checkoutData.username} style={{ opacity: 0.7, cursor: 'not-allowed' }} />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Delivery Location</label>
                        <input name="location" required value={checkoutData.location} onChange={handleInputChange} placeholder="123 Cyber Street, Neo Tokyo" />
                    </div>

                    <div className="card-section">
                        <h3>Payment Details</h3>
                        <div className="form-group">
                            <label>Payment Token</label>
                            <input name="cc_num_field" autoComplete="new-password" placeholder="XXXX XXXX XXXX XXXX" maxLength="19" value={checkoutData.cc_num_field} onChange={handleInputChange} />
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Valid Thru</label>
                                <input name="cc_exp_field" autoComplete="new-password" required placeholder="XX/XX" maxLength="5" value={checkoutData.cc_exp_field} onChange={handleInputChange} />
                            </div>
                            <div className="form-group">
                                <label>Code</label>
                                <input name="cc_cvc_field" autoComplete="new-password" required placeholder="XXX" maxLength="3" value={checkoutData.cc_cvc_field} onChange={handleInputChange} />
                            </div>
                        </div>
                    </div>

                    <div className="modal-actions">
                        <button type="button" onClick={onClose} className="cancel-btn">Cancel</button>
                        <button type="submit" className="proceed-btn" disabled={processing}>
                            {processing ? "Processing..." : `Pay ${price ? 'Rs. ' + price.toLocaleString() : ''}`}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CheckoutModal;
