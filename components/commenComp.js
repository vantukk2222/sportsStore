import { useEffect, useState } from "react";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useSelector } from "react-redux";

const { StyleSheet, View, Image, Text, FlatList, Modal, TouchableOpacity } = require("react-native");


export const CommentItem = ({ avatar, name, rating, category, content, listImg, id }) => {

    const [selectedImage, setSelectedImage] = useState(null);
    const {data:dataUser, loading:loadingUser, error:errorUser} = useSelector((state)=>state.listUserReducer)
    const [dataUserJson, setDataUserJson] = useState(dataUser)
    // const dataUserJson = JSON.parse(JSON.stringify(dataUser))
    // useEffect(
    useEffect(()=>{
        
        const dataUserJsonz = JSON.parse(JSON.stringify(dataUser))
        setDataUserJson(dataUserJsonz)

    },[dataUser])
    const handleImagePress = (url) => {
        setSelectedImage(url);
    };

    const handleCloseModal = () => {
        setSelectedImage(null);
    };
    return <View style={styles.commentContainer}>
        <View style={styles.userInfo}>
            <View style={{ flexDirection: 'row' }}>
                <Image source={{ uri: dataUserJson[id]?.image_url ||"https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"}} style={styles.avatar} />
            </View>
            <View>
                <Text style={styles.name}>{dataUserJson[id]?.name}</Text>
                <Text style={styles.category}>{category}</Text>
            </View>
        </View>
        <Text style={styles.rating}>{rating ? 'Thích' : 'Không thích'}</Text>
        <Text style={styles.content}>{content}</Text>
        <View style={{flexDirection:'row', borderWidth:1, padding:8}}>
        <FlatList
        style={{backgroundColor:'#F6F6F6'}}
            data={listImg}
            horizontal
            renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleImagePress(item.url)} style={{marginRight:10}}>
                    <Image source={{ uri: item.url }} style={styles.image} />
                </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
        />
        </View>
        <Modal visible={selectedImage !== null} transparent>
            <View style={styles.modalContainer}>
                <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
                <Icon name="angle-left" size={30} style={{
                    color:'white',
                    alignItems: 'flex-end',
                    marginLeft: 15,
                }}></Icon>

                </TouchableOpacity>
                <Image source={{ uri: selectedImage }} style={styles.largeImage} resizeMode="contain" />

                <View style={{ flexDirection: 'row' }}>
                    <FlatList
                        data={listImg}
                        horizontal
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => setSelectedImage(item.url)}>
                                <Image source={{ uri: item.url }} style={styles.image} />
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            </View>
        </Modal>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    modalContainer: {
        padding:35,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.9)",
    },
    closeButton: {
        position: "absolute",
        top: 10,
        left: 15,
        zIndex: 10,
    },
    closeText: {
        color: "red",
        fontSize: 16,
    },
    largeImage: {
        width: "90%",
        height: "90%",
    },
    commentContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 25,
        marginRight: 10,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    rating: {
        marginBottom: 5,
    },
    category: {
        marginBottom: 5,
        fontStyle: 'italic',
    },
    content: {
        marginBottom: 10,
    },
    image: {
        width: 100,
        height: 100,
        marginRight: 10,
    },
});
