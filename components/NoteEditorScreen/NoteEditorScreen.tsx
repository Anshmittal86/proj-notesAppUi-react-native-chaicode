// React hooks
import { useEffect, useState } from 'react';

// React Native core components
import {
	ImageBackground,
	KeyboardAvoidingView,
	Platform,
	Pressable,
	ScrollView,
	Text,
	TextInput,
	useWindowDimensions,
	View
} from 'react-native';

// Third-party libraries
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

// Project constants and types
import { Colors, FixedColors } from '../../constants/Colors';
import { Note } from '../../constants/DummyData';

// Styles
import styles from './NoteEditorScreen.styles';

interface NoteEditorScreenProps {
	note: Note | null;
	isDarkMode: boolean;
	onBack: () => void;
	onSave: (noteData: { title: string; content: string }) => void;
}

export default function NoteEditorScreen({
	note,
	isDarkMode,
	onBack,
	onSave
}: NoteEditorScreenProps) {
	const { width } = useWindowDimensions();

	const scale = (size: number) => {
		const baseWidth = Math.min(width, 430);
		return (baseWidth / 375) * size;
	};

	const isTablet = width > 768;
	const colors = isDarkMode ? Colors.dark : Colors.light;

	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');

	useEffect(() => {
		if (note) {
			setTitle(note.title);
			setContent(note.content);
		} else {
			setTitle('');
			setContent('');
		}
	}, [note]);

	const handleSave = () => {
		if (!title.trim() && !content.trim()) {
			return;
		}

		onSave({
			title: title.trim() || 'Untitled Note',
			content: content.trim()
		});
	};

	return (
		<View style={[styles.container, { backgroundColor: colors.editorBackground }]}>
			<KeyboardAvoidingView
				style={{ flex: 1 }}
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			>
				<ScrollView
					bounces={false}
					showsVerticalScrollIndicator={false}
					keyboardShouldPersistTaps="handled"
				>
					<ImageBackground
						source={require('../../assets/header-bg.png')}
						style={[styles.headerImage, { height: scale(220) }]}
						resizeMode="cover"
					>
						<SafeAreaView style={[styles.headerOverlay, { paddingHorizontal: scale(20) }]}>
							<View style={styles.topRow}>
								<Pressable
									onPress={onBack}
									style={[
										styles.backButton,
										{
											backgroundColor: colors.backButtonBackground,
											padding: scale(8)
										}
									]}
								>
									<Ionicons name="chevron-back" size={scale(22)} color={colors.backButtonIcon} />
								</Pressable>

								<Pressable
									onPress={handleSave}
									style={[
										styles.saveButton,
										{
											backgroundColor: colors.primary,
											paddingHorizontal: scale(16),
											paddingVertical: scale(8)
										}
									]}
								>
									<Ionicons
										name="checkmark-circle-outline"
										size={scale(18)}
										color={colors.buttonText}
									/>

									<Text
										style={[styles.saveText, { color: colors.buttonText, fontSize: scale(14) }]}
									>
										{note ? 'Update' : 'Save'}
									</Text>
								</Pressable>
							</View>

							<View style={[styles.headerTitleContainer, { marginTop: scale(25) }]}>
								<Text
									style={[
										styles.mainTitle,
										{ color: FixedColors.editorHeaderTitle, fontSize: scale(30) }
									]}
								>
									{note ? 'Edit Note' : 'Add Note'}
								</Text>

								<Text
									style={[
										styles.subTitle,
										{ color: FixedColors.editorHeaderSubtitle, fontSize: scale(15) }
									]}
								>
									{note ? 'Update your saved thoughts' : 'Write your thoughts and ideas'}
								</Text>
							</View>
						</SafeAreaView>
					</ImageBackground>

					<View
						style={[
							styles.contentCard,
							{
								backgroundColor: colors.cardBackground,
								padding: scale(20),
								marginTop: scale(-30),
								alignSelf: isTablet ? 'center' : 'stretch',
								width: isTablet ? '80%' : '100%'
							}
						]}
					>
						<Text style={[styles.label, { color: colors.text, fontSize: scale(14) }]}>
							Note Title
						</Text>

						<View
							style={[
								styles.inputWrapper,
								{
									backgroundColor: colors.inputBackground,
									borderColor: colors.border,
									padding: scale(12)
								}
							]}
						>
							<TextInput
								style={[styles.titleInput, { color: colors.text, fontSize: scale(15) }]}
								placeholder="Enter note title..."
								placeholderTextColor={colors.placeholder}
								value={title}
								onChangeText={(text) => setTitle(text.slice(0, 100))}
								maxLength={100}
							/>

							<Text style={[styles.counter, { color: colors.textSecondary, fontSize: scale(11) }]}>
								{title.length}/100
							</Text>
						</View>

						<Text style={[styles.label, { color: colors.text, fontSize: scale(14) }]}>
							Note Content
						</Text>

						<View
							style={[
								styles.inputWrapper,
								styles.contentWrapper,
								{
									backgroundColor: colors.inputBackground,
									borderColor: colors.border,
									padding: scale(12),
									minHeight: scale(200)
								}
							]}
						>
							<TextInput
								style={[styles.contentText, { color: colors.text, fontSize: scale(15) }]}
								placeholder="Write your note here..."
								placeholderTextColor={colors.placeholder}
								multiline
								value={content}
								onChangeText={(text) => setContent(text.slice(0, 2000))}
								textAlignVertical="top"
								maxLength={2000}
							/>

							<Text style={[styles.counter, { color: colors.textSecondary, fontSize: scale(11) }]}>
								{content.length}/2000
							</Text>
						</View>

						<Pressable
							style={[
								styles.tagAction,
								{
									backgroundColor: colors.tagBackground,
									padding: scale(14),
									marginTop: scale(15)
								}
							]}
						>
							<View style={styles.tagLeft}>
								<Ionicons name="pricetag-outline" size={scale(18)} color={colors.iconPrimary} />

								<Text style={[styles.tagText, { color: colors.tagText, fontSize: scale(14) }]}>
									Add a tag (optional)
								</Text>
							</View>

							<Ionicons name="chevron-forward" size={scale(16)} color={colors.iconPrimary} />
						</Pressable>

						<View style={[styles.toolGrid, { marginTop: scale(25) }]}>
							<ToolItem
								icon="calendar-outline"
								label="Today"
								scale={scale}
								iconColor={colors.iconPrimary}
								textColor={colors.textSecondary}
							/>

							<ToolItem
								icon="notifications-outline"
								label="Reminder"
								scale={scale}
								iconColor={colors.iconPrimary}
								textColor={colors.textSecondary}
							/>

							<ToolItem
								icon="pin-outline"
								label="Pin Note"
								scale={scale}
								iconColor={colors.iconPrimary}
								textColor={colors.textSecondary}
							/>

							<ToolItem
								icon="color-palette-outline"
								label="Color"
								scale={scale}
								iconColor={colors.iconPrimary}
								textColor={colors.textSecondary}
							/>
						</View>

						<View
							style={[
								styles.tipBox,
								{
									backgroundColor: colors.tipBackground,
									padding: scale(15),
									marginTop: scale(25)
								}
							]}
						>
							<Ionicons name="bulb-outline" size={scale(22)} color={colors.iconPrimary} />

							<Text style={[styles.tipText, { color: colors.tipText, fontSize: scale(13) }]}>
								Tip: Use simple titles and clear points to find your notes easily later.
							</Text>
						</View>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		</View>
	);
}

const ToolItem = ({
	icon,
	label,
	scale,
	iconColor,
	textColor
}: {
	icon: any;
	label: string;
	scale: Function;
	iconColor: string;
	textColor: string;
}) => (
	<Pressable style={styles.toolItem}>
		<Ionicons name={icon} size={scale(22)} color={iconColor} />

		<Text style={[styles.toolLabel, { color: textColor, fontSize: scale(11) }]}>{label}</Text>
	</Pressable>
);
