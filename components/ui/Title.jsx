import { Text, StyleSheet, Platform } from "react-native";

function Title({ children }) {
	return <Text style={styles.title}>{children}</Text>;
}

export default Title;

const styles = StyleSheet.create({
	title: {
		fontFamily: "open-sans-bold",
		fontSize: 24,
		// fontWeight: "bold",
		color: "white",
		textAlign: "center",
		borderWidth: Platform.select({ android: 2, ios: 0 }), //Platform.OS === "android" ? 2 : 0,
		borderColor: "white",
		padding: 12,
		marginTop: 12,
		maxWidth: "80%",
		width: 300
	}
});
