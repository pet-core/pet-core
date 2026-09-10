import { StyleSheet, View, Image } from "react-native";
import { useSplash } from "../hooks/useSplash";

export default function SplashScreen() {
    useSplash();

    return (
        <View style={styles.container}>
            <Image source={require("../../assets/logo.jpeg")} style={styles.logo}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    logo: {
        width: 260,
        height: 260,
        resizeMode: "contain",
    },
});
