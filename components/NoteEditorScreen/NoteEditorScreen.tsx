import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
	ImageBackground,
	Pressable,
	ScrollView,
	Text,
	TextInput,
	useWindowDimensions,
	View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './NoteEditorScreen.styles';

interface NoteEditorScreenProps {
	onBack: () => void;
}

export default function NoteEditorScreen({ onBack }: NoteEditorScreenProps) {
	const { width } = useWindowDimensions();

	const scale = (size: number) => (width / 375) * size;
	const isTablet = width > 768;

	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');

	return (
		<View style={styles.container}>
			<ScrollView bounces={false} showsVerticalScrollIndicator={false}>
				<ImageBackground
					source={require('../../assets/header-bg.png')}
					style={[styles.headerImage, { height: scale(220) }]}
					resizeMode="cover"
				>
					<SafeAreaView style={[styles.headerOverlay, { paddingHorizontal: scale(20) }]}>
						<View style={styles.topRow}>
							<Pressable onPress={onBack} style={[styles.backButton, { padding: scale(8) }]}>
								<Ionicons name="chevron-back" size={scale(22)} color="#333" />
							</Pressable>
							<Pressable
								style={[
									styles.saveButton,
									{ paddingHorizontal: scale(16), paddingVertical: scale(8) }
								]}
							>
								<Ionicons name="checkmark-circle-outline" size={scale(18)} color="#fff" />
								<Text style={[styles.saveText, { fontSize: scale(14) }]}>Save</Text>
							</Pressable>
						</View>

						<View style={[styles.headerTitleContainer, { marginTop: scale(25) }]}>
							<Text style={[styles.mainTitle, { fontSize: scale(30) }]}>Add Note</Text>
							<Text style={[styles.subTitle, { fontSize: scale(15) }]}>
								Write your thoughts and ideas
							</Text>
						</View>
					</SafeAreaView>
				</ImageBackground>

				<View
					style={[
						styles.contentCard,
						{
							padding: scale(20),
							marginTop: scale(-30),
							alignSelf: isTablet ? 'center' : 'stretch',
							width: isTablet ? '80%' : '100%'
						}
					]}
				>
					<Text style={[styles.label, { fontSize: scale(14) }]}>Note Title</Text>
					<View style={[styles.inputWrapper, { padding: scale(12) }]}>
						<TextInput
							style={[styles.titleInput, { fontSize: scale(15) }]}
							placeholder="Enter note title..."
							value={title}
							onChangeText={setTitle}
							maxLength={100}
						/>
						<Text style={[styles.counter, { fontSize: scale(11) }]}>{title.length}/100</Text>
					</View>

					<Text style={[styles.label, { fontSize: scale(14) }]}>Note Content</Text>
					<View
						style={[
							styles.inputWrapper,
							styles.contentWrapper,
							{ padding: scale(12), minHeight: scale(200) }
						]}
					>
						<TextInput
							style={[styles.contentText, { fontSize: scale(15) }]}
							placeholder="Write your note here..."
							multiline
							value={content}
							onChangeText={setContent}
							textAlignVertical="top"
						/>
						<Text style={[styles.counter, { fontSize: scale(11) }]}>{content.length}/2000</Text>
					</View>

					<Pressable style={[styles.tagAction, { padding: scale(14), marginTop: scale(15) }]}>
						<View style={styles.tagLeft}>
							<Ionicons name="pricetag-outline" size={scale(18)} color="#6366f1" />
							<Text style={[styles.tagText, { fontSize: scale(14) }]}>Add a tag (optional)</Text>
						</View>
						<Ionicons name="chevron-forward" size={scale(16)} color="#6366f1" />
					</Pressable>

					<View style={[styles.toolGrid, { marginTop: scale(25) }]}>
						<ToolItem icon="calendar-outline" label="Today" scale={scale} />
						<ToolItem icon="notifications-outline" label="Reminder" scale={scale} />
						<ToolItem icon="pin-outline" label="Pin Note" scale={scale} />
						<ToolItem icon="color-palette-outline" label="Color" scale={scale} />
					</View>

					<View style={[styles.tipBox, { padding: scale(15), marginTop: scale(25) }]}>
						<Ionicons name="bulb-outline" size={scale(22)} color="#6366f1" />
						<Text style={[styles.tipText, { fontSize: scale(13) }]}>
							Tip: Use simple titles and clear points to find your notes easily later.
						</Text>
					</View>
				</View>
			</ScrollView>
		</View>
	);
}

const ToolItem = ({ icon, label, scale }: { icon: any; label: string; scale: Function }) => (
	<Pressable style={styles.toolItem}>
		<Ionicons name={icon} size={scale(22)} color="#6366f1" />
		<Text style={[styles.toolLabel, { fontSize: scale(11) }]}>{label}</Text>
	</Pressable>
);
