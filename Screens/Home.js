import React, { useEffect, useState } from 'react';
import { View, Text, FlatList,StyleSheet} from 'react-native';
import axios from 'axios';

const HomeScreen = ({ route }) => {
    const { username } = route.params;
    const [userData, setUserData] = useState(null);

    // dùng axios
    // useEffect(() => {
    //     // Gửi yêu cầu API để lấy thông tin tài khoản dựa trên tên đăng nhập
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.get(`https://65637199ee04015769a735e3.mockapi.io/account?username=${username}`);
    //             setUserData(response.data[0]); // Lấy dữ liệu từ phần tử đầu tiên (vì chỉ cần lấy 1 một tài khoản)
    //         } catch (error) {
    //             console.error('Lỗi khi lấy dữ liệu người dùng:', error);
    //         }
    //     };

    //     fetchData();
    // }, [username]); // Gửi yêu cầu mỗi khi tên đăng nhập thay đổi


    // dùng fetch
    useEffect(() => {
        // Gửi yêu cầu API để lấy thông tin tài khoản dựa trên tên đăng nhập
        const fetchData = async () => {
          try {
            const response = await fetch(`https://65637199ee04015769a735e3.mockapi.io/account?username=${username}`);
      
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
      
            const data = await response.json();
            setUserData(data[0]); // Lấy dữ liệu từ phần tử đầu tiên (vì chỉ cần lấy 1 một tài khoản)
          } catch (error) {
            console.error('Lỗi khi lấy dữ liệu người dùng:', error);
          }
        };
      
        fetchData();
      }, [username]); // Gửi yêu cầu mỗi khi tên đăng nhập thay đổi
      
    return (
        <View>
            {userData ? (
                <>
                    <Text>Chào mừng bạn, {username}!</Text>
                    <Text>Tên đăng nhập: {userData.username}</Text>
                    <Text>ID: {userData.id}</Text>
                    <Text>Tên: {userData.name}</Text>
                    <Text>Công việc của bạn:</Text>
                    <FlatList
                        data={userData.todos}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.taskContainer}>
                                <Text>{item.name}</Text>
                                <Text>Hoàn thành: {item.complete ? 'Có' : 'Không'}</Text>
                            </View>
                        )}
                    />
                </>
            ) : (
                <Text>Đang tải dữ liệu...</Text>
            )}
        </View>
    );
};
const styles = StyleSheet.create({
    taskContainer: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 8,
      marginBottom: 8,
    },
  });
export default HomeScreen;
