const renderProducts = (data, index) => {
    // Các phần code khác ở đây...
  
    const updateTotal = (newQuantity, productPrice) => {
      const updatedTotal = total - (data.quantity * product.size.product.price) + (newQuantity * productPrice);
      setTotal(updatedTotal);
    };
  
    return (
      <TouchableOpacity
        // Các phần code khác ở đây...
      >
        {/* Các phần code khác ở đây */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          {/* Các phần code khác ở đây */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                borderRadius: 100,
                marginRight: 20,
                padding: 4,
                borderWidth: 1,
                borderColor: COLOURS.backgroundMedium,
                opacity: 0.5,
              }}
            >
              <MaterialCommunityIcons
                onPress={() => {
                  if (quantity_buy > 1) {
                    setQuantity_Buy(quantity_buy - 1);
                    updateTotal(quantity_buy - 1, data.size.product.price);
                  }
                }}
                name="minus"
                style={{
                  fontSize: 16,
                  color: COLOURS.backgroundDark,
                }}
              />
            </View>
            <Text>{quantity_buy}</Text>
            <View
              style={{
                borderRadius: 100,
                marginLeft: 20,
                padding: 4,
                borderWidth: 1,
                borderColor: COLOURS.backgroundMedium,
                opacity: 0.5,
              }}
            >
              <MaterialCommunityIcons
                onPress={() => {
                  setQuantity_Buy(quantity_buy + 1);
                  updateTotal(quantity_buy + 1, data.size.product.price);
                }}
                name="plus"
                style={{
                  fontSize: 16,
                  color: COLOURS.backgroundDark,
                }}
              />
            </View>
          </View>
          {/* Các phần code khác ở đây */}
        </View>
        {/* Các phần code khác ở đây */}
      </TouchableOpacity>
    );
  };
  