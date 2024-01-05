// EditRevenue.jsx

const EditRevenue = () => {
    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Ví của tôi </h1>
            <p style={styles.amountLarge}>Số tiền 💳: 100,000 VNĐ</p>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '1800px',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        height: '210px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    heading: {
        color: '#333',
        fontSize: '24px',
        marginBottom: '20px',
    },
    amountLarge: {
        color: '#FF5733', // Change the color to your desired color
        fontSize: '28px', // Increase the font size
        marginBottom: '10px',
        textAlign: 'center', // Center the text
    },
};

export default EditRevenue;
