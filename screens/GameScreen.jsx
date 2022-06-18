import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";

import Title from "../components/ui/Title";

import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";

function GameScreen({ userNumber, onGameOver }) {
	// Declare the min and max number of guesses
	let minBoundary = 1;
	let maxBoundary = 100;

	// Declare initial guess by generating a random no between 1 and 100 and excluding the user's entered number
	const initialGuess = generateRandomBetween(1, 100, userNumber);
	const [currentGuess, setCurrentGuess] = useState(initialGuess);

	useEffect(() => {
		if (currentGuess === userNumber) {
			onGameOver();
		}
	}, [currentGuess, userNumber, onGameOver]);

	// Function to generate a random number between min and max and exclude the user's entered number
	function generateRandomBetween(min, max, exclude) {
		const rndNum = Math.floor(Math.random() * (max - min)) + min;

		if (rndNum === exclude) {
			return generateRandomBetween(min, max, exclude);
		} else {
			return rndNum;
		}
	}

	// Function to handle the user's guess
	// direction => "lower" or "greater"
	function nextGuessHandler(direction) {
		// To handle infinite loop issues
		if (
			(direction === "lower" && currentGuess < userNumber) ||
			(direction === "greater" && currentGuess > userNumber)
		) {
			Alert.alert("Don't lie!", "You know that this is wrong...", [
				{ text: "Sorry!", style: "cancel" }
			]);
			return;
		}

		if (direction === "lower") {
			maxBoundary = currentGuess;
		} else {
			minBoundary = currentGuess + 1;
		}
		const newRndNumber = generateRandomBetween(
			minBoundary,
			maxBoundary,
			currentGuess
		);
		setCurrentGuess(newRndNumber);
	}

	return (
		<View style={styles.mainScreen}>
			<Title>Opponent's Guess</Title>
			<NumberContainer>{currentGuess}</NumberContainer>
			<Card>
				<InstructionText style={styles.instructionText}>
					Higher or Lower?
				</InstructionText>
				<View style={styles.buttonsContainer}>
					<View style={styles.buttonContainer}>
						<PrimaryButton onPressed={nextGuessHandler.bind(this, "lower")}>
							-
						</PrimaryButton>
					</View>
					<View style={styles.buttonContainer}>
						<PrimaryButton onPressed={nextGuessHandler.bind(this, "greater")}>
							+
						</PrimaryButton>
					</View>
				</View>
			</Card>
			<View>{/* LOG ROUNDS */}</View>
		</View>
	);
}

export default GameScreen;

const styles = StyleSheet.create({
	mainScreen: {
		flex: 1,
		padding: 32
	},
	instructionText: {
		marginBottom: 12
	},
	buttonsContainer: {
		flexDirection: "row"
	},
	buttonContainer: {
		flex: 1
	}
});
