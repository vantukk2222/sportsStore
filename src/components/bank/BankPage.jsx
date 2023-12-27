// BankPage.js
import { useState } from 'react';
import MenuProfile from '../menuprofile/MenuProfile';
import AccountInfo from './AccountInfo';
import AddAccountModal from './AddAccountModal';
import './Bank.css';

const BankPage = () => {
    const [accountInfo, setAccountInfo] = useState({
        accountNumber: '123456789',
        balance: 1000,
        ownerName: 'Người Dùng',
    });

    const [accounts, setAccounts] = useState([
        {
            accountNumber: '123456789',
            balance: 1000,
            ownerName: 'Người Dùng',
        },
    ]);

    const [isAddAccountModalOpen, setIsAddAccountModalOpen] = useState(false);

    const handleOpenAddAccountModal = () => {
        setIsAddAccountModalOpen(true);
    };

    const handleCloseAddAccountModal = () => {
        setIsAddAccountModalOpen(false);
    };

    const handleAddAccount = (newAccount) => {
        // Cập nhật danh sách tài khoản và đóng modal
        setAccounts([...accounts, newAccount]);
        setIsAddAccountModalOpen(false);
    };
    const handleEditAccount = (editedAccount) => {
        // Cập nhật danh sách tài khoản và đóng modal (hoặc mở modal sửa)
        // (Chưa hiện thực logic này, bạn có thể thêm sau)
    };

    const handleDeleteAccount = (accountNumber) => {
        // Xóa tài khoản khỏi danh sách
        setAccounts(accounts.filter((acc) => acc.accountNumber !== accountNumber));
    };

    return (
        <>
            <section className="shop background">
                <div className="container d_flex">
                    <MenuProfile />

                    <div className="contentWidth">
                        <div className="heading d_flex">
                            <div className="heading-left row f_flex">
                                <h1>Ngân hàng của tôi</h1>
                            </div>
                            <div className="heading-right">
                                <button onClick={handleOpenAddAccountModal}>Thêm tài khoản ngân hàng</button>
                            </div>
                        </div>
                        <div className="product-content">
                            <div>
                                <AccountInfo
                                    accountNumber={accountInfo.accountNumber}
                                    balance={accountInfo.balance}
                                    ownerName={accountInfo.ownerName}
                                    accounts={accounts}
                                    onEdit={handleEditAccount}
                                    onDelete={handleDeleteAccount}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="modalBank">
                <AddAccountModal
                    isOpen={isAddAccountModalOpen}
                    onRequestClose={handleCloseAddAccountModal}
                    onAddAccount={handleAddAccount}
                />
            </div>
        </>
    );
};

export default BankPage;
