import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const Login = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            // Check if the username and password are entered
            if (!username || !password) {
                alert('Vui lòng nhập đầy đủ thông tin đăng nhập.');
                return;
            }

            const response = await fetch(
                'https://65637199ee04015769a735e3.mockapi.io/account'
            );
            const users = await response.json();

            const user = users.find(
                (user) => user.username === username && user.password === password
            );

            if (user) {
                // Chuyển đến màn hình Home và truyền thông tin tài khoản
                navigation.navigate('Home', { username });
            } else {
                alert('Thông tin đăng nhập không hợp lệ');
            }
        } catch (error) {
            alert('Lỗi khi yêu cầu API', error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Email hoặc số điện thoại"
                    value={username}
                    onChangeText={(text) => setUsername(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Mật khẩu"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                    <Text style={styles.loginButtonText}>Đăng nhập</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.forgotPassword}>
                <Text style={styles.forgotPasswordText}>Quên mật khẩu?</Text>
            </TouchableOpacity>

            <View style={styles.separatorContainer}>
                <View style={styles.separator} />
                <Text style={styles.separatorText}>Hoặc</Text>
                <View style={styles.separator} />
            </View>

            <TouchableOpacity style={styles.registerButton}>
                <Text style={styles.registerButtonText}>Tạo tài khoản mới</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
    },
    logoText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: 10,
        color: '#1877f2',
    },
    inputContainer: {
        width: '100%',
    },
    input: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        marginBottom: 15,
        borderRadius: 5,
    },
    loginButton: {
        backgroundColor: '#1877f2',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    forgotPassword: {
        marginTop: 15,
    },
    forgotPasswordText: {
        color: '#1877f2',
        fontSize: 14,
    },
    separatorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    separator: {
        flex: 1,
        height: 1,
        backgroundColor: '#d1d1d1',
    },
    separatorText: {
        marginHorizontal: 10,
        fontSize: 16,
        color: '#888',
    },
    registerButton: {
        backgroundColor: '#42b72a',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    registerButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Login;



