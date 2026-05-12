// React Native core components
import { Pressable, StyleSheet, Text, View } from 'react-native';

// Third-party libraries
import { Ionicons } from '@expo/vector-icons';

// Project constants
import { Colors } from '../../constants/Colors';

// Styles
import styles from './NoteCard.styles';

interface NoteCardProps {
	title: string;
	content: string;
	date: string;
	accentColor?: string;
	isDarkMode: boolean;
	onPress: () => void;
}

export default function NoteCard({
	title,
	content,
	date,
	accentColor,
	isDarkMode,
	onPress
}: NoteCardProps) {
	const colors = isDarkMode ? Colors.dark : Colors.light;

	const containerStyle = StyleSheet.compose(styles.card, {
		backgroundColor: colors.cardBackground,
		borderColor: colors.border
	});

	const titleStyle = StyleSheet.compose(styles.title, {
		color: colors.text
	});

	const contentStyle = StyleSheet.compose(styles.content, {
		color: colors.textSecondary
	});

	const dateStyle = StyleSheet.flatten([
		styles.date,
		{
			color: colors.textSecondary
		}
	]);

	return (
		<Pressable
			style={({ pressed }) => [containerStyle, pressed && styles.cardPressed]}
			onPress={onPress}
		>
			<View style={[styles.accentLine, { backgroundColor: accentColor || colors.primary }]} />

			<View style={styles.cardBody}>
				<View style={styles.topRow}>
					<Text style={titleStyle} numberOfLines={1}>
						{title}
					</Text>

					<View style={styles.menuButton}>
						<Ionicons name="ellipsis-vertical" size={18} color={colors.iconSecondary} />
					</View>
				</View>

				<Text style={contentStyle} numberOfLines={2}>
					{content}
				</Text>

				<View style={styles.bottomRow}>
					<View style={styles.dateRow}>
						<Ionicons name="calendar-outline" size={16} color={colors.iconSecondary} />

						<Text style={dateStyle} numberOfLines={1}>
							{date}
						</Text>
					</View>
				</View>
			</View>
		</Pressable>
	);
}
