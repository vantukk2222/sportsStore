import { useState } from 'react';
import MenuProfile from '../menuprofile/MenuProfile';
import AddAddressModal from './AddAddressModal';
import './Adress.css';
import ListAddress from './ListAdress';

const AddressData = [
    {
        name: 'Người Nhận 1',
        phone: '123456789',
        address: '123 ABC Street, City A',
    },
    {
        name: 'Người Nhận 2',
        phone: '987654321',
        address: '456 XYZ Street, City B',
    },
    {
        name: 'Người Nhận 3',
        phone: '987654321',
        address: '456 XYZ Street, City B',
    },
];

const Address = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [addresses, setAddresses] = useState(AddressData);

    const handleAddAddress = (newAddress) => {
        // Update the list of addresses with the new address
        setAddresses([...addresses, newAddress]);
        // Close the modal
        closeModal();
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <section className="shop background">
                <div className="container d_flex">
                    <MenuProfile />

                    <div className="contentWidth">
                        <div className="heading d_flex">
                            <div className="heading-left row f_flex">
                                <h2>ĐỊA CHỈ CỦA TÔI</h2>
                            </div>
                            <div className="heading-right">
                                <button className="add-address-button" onClick={openModal}>
                                    Thêm địa chỉ
                                </button>
                            </div>
                        </div>
                        <div className="product-content">
                            {/* Truyền dữ liệu địa chỉ vào ListAdress */}
                            <ListAddress addresses={addresses} />
                        </div>
                    </div>
                </div>
            </section>

            <AddAddressModal isOpen={isModalOpen} onRequestClose={closeModal} onAddAddress={handleAddAddress} />
        </>
    );
};

export default Address;
