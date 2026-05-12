import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../constants/Colors';
import styles from './NoteCard.styles';

interface NoteCardProps {
	title: string;
	content: string;
	date: string;
	accentColor?: string;
	isDarkMode: boolean;
}

export default function NoteCard({
	title,
	content,
	date,

	accentColor = '#8B5CF6',
	isDarkMode
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

	return (
		<Pressable
			style={({ pressed }) => [containerStyle, pressed && styles.cardPressed]}
			onPress={() => {}}
		>
			<View style={[styles.accentLine, { backgroundColor: accentColor }]} />

			<View style={styles.cardBody}>
				<View style={styles.topRow}>
					<Text style={titleStyle} numberOfLines={1}>
						{title}
					</Text>

					<Pressable hitSlop={8} style={styles.menuButton}>
						<Ionicons name="ellipsis-vertical" size={18} color={colors.textSecondary} />
					</Pressable>
				</View>

				<Text style={contentStyle} numberOfLines={2}>
					{content}
				</Text>

				<View style={styles.bottomRow}>
					<View style={styles.dateRow}>
						<Ionicons name="calendar-outline" size={16} color={colors.textSecondary} />
						<Text style={[styles.date, { color: colors.textSecondary }]} numberOfLines={1}>
							{date}
						</Text>
					</View>
				</View>
			</View>
		</Pressable>
	);
}
