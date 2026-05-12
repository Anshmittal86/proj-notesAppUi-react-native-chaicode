// React hooks
import { useEffect, useState } from 'react';

// React Native core components
import {
	FlatList,
	Pressable,
	StatusBar,
	Switch,
	Text,
	TextInput,
	useWindowDimensions,
	View
} from 'react-native';

// Third-party libraries
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

// Project constants and types
import { Colors } from '../../constants/Colors';
import { Note } from '../../constants/DummyData';

// Project components
import NoteCard from '../NoteCard/NoteCard';

// Styles
import styles from './NotesListingScreen.styles';

interface NotesListingScreenProps {
	notes: Note[];
	isDarkMode: boolean;
	setIsDarkMode: (value: boolean) => void;
	onOpenAddNote: () => void;
	onOpenEditNote: (note: Note) => void;
}

export default function NotesListingScreen({
	notes,
	isDarkMode,
	setIsDarkMode,
	onOpenAddNote,
	onOpenEditNote
}: NotesListingScreenProps) {
	const { width } = useWindowDimensions();

	const [searchQuery, setSearchQuery] = useState('');
	const [filteredNotes, setFilteredNotes] = useState(notes);

	const colors = isDarkMode ? Colors.dark : Colors.light;

	const scale = (size: number) => {
		const baseWidth = Math.min(width, 430);
		return (baseWidth / 375) * size;
	};

	const isTablet = width > 768;

	useEffect(() => {
		const query = searchQuery.trim().toLowerCase();

		if (!query) {
			setFilteredNotes(notes);
			return;
		}

		const searchedNotes = notes.filter((note) => {
			const title = note.title.toLowerCase();
			const content = note.content.toLowerCase();
			const date = note.date.toLowerCase();

			return title.includes(query) || content.includes(query) || date.includes(query);
		});

		setFilteredNotes(searchedNotes);
	}, [searchQuery, notes]);

	return (
		<SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
			<StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

			<View style={[styles.header, { paddingHorizontal: scale(20) }]}>
				<View style={styles.topRow}>
					<View style={{ flex: 1 }}>
						<Text style={[styles.headerTitle, { color: colors.text, fontSize: scale(28) }]}>
							My Notes
						</Text>

						<Text
							style={[styles.subHeaderTitle, { color: colors.textSecondary, fontSize: scale(14) }]}
						>
							Capture your ideas anytime
						</Text>
					</View>

					<View style={styles.darkModeContainer}>
						<View style={[styles.moonCircle, { backgroundColor: colors.moonBackground }]}>
							<Ionicons
								name={isDarkMode ? 'moon' : 'sunny'}
								size={scale(14)}
								color={colors.moonIcon}
							/>
						</View>

						{!isTablet && (
							<Text style={[styles.darkModeText, { color: colors.text, fontSize: scale(11) }]}>
								Dark Mode
							</Text>
						)}

						<Switch
							value={isDarkMode}
							onValueChange={setIsDarkMode}
							trackColor={{ false: colors.border, true: colors.primaryDark }}
							thumbColor={colors.buttonText}
							style={{ transform: [{ scale: scale(0.8) }] }}
						/>
					</View>
				</View>

				<View
					style={[
						styles.searchWrapper,
						{
							backgroundColor: colors.searchBackground,
							height: scale(50),
							borderColor: colors.border
						}
					]}
				>
					<Ionicons name="search-outline" size={scale(18)} color={colors.placeholder} />

					<TextInput
						style={[styles.searchInput, { color: colors.text, fontSize: scale(15) }]}
						placeholder="Search notes..."
						placeholderTextColor={colors.placeholder}
						value={searchQuery}
						onChangeText={setSearchQuery}
						autoCorrect={false}
						autoCapitalize="none"
					/>

					{searchQuery.length > 0 ?
						<Pressable onPress={() => setSearchQuery('')} hitSlop={8}>
							<Ionicons name="close-circle" size={scale(20)} color={colors.placeholder} />
						</Pressable>
					:	<MaterialCommunityIcons
							name="tune-variant"
							size={scale(20)}
							color={colors.iconSecondary}
						/>
					}
				</View>

				<View
					style={[
						styles.statsContainer,
						{
							backgroundColor: colors.cardBackground,
							padding: scale(15)
						}
					]}
				>
					<View style={styles.statBox}>
						<View
							style={[
								styles.iconCircle,
								{
									backgroundColor: colors.statsIconBackground,
									width: scale(40),
									height: scale(40)
								}
							]}
						>
							<Ionicons name="document-text" size={scale(18)} color={colors.primary} />
						</View>

						<View>
							<Text style={[styles.statNumber, { color: colors.text, fontSize: scale(16) }]}>
								{notes.length}
							</Text>

							<Text
								style={[styles.statLabel, { color: colors.textSecondary, fontSize: scale(12) }]}
							>
								Notes
							</Text>
						</View>
					</View>

					<View style={[styles.statDivider, { backgroundColor: colors.divider }]} />

					<View style={styles.statBox}>
						<View
							style={[
								styles.iconCircle,
								{
									backgroundColor: colors.pinIconBackground,
									width: scale(40),
									height: scale(40)
								}
							]}
						>
							<Ionicons name="pin" size={scale(18)} color={colors.pinIcon} />
						</View>

						<View>
							<Text style={[styles.statNumber, { color: colors.text, fontSize: scale(16) }]}>
								3
							</Text>

							<Text
								style={[styles.statLabel, { color: colors.textSecondary, fontSize: scale(12) }]}
							>
								Pinned
							</Text>
						</View>
					</View>
				</View>

				<View style={styles.sectionHeader}>
					<Text style={[styles.sectionTitle, { color: colors.text, fontSize: scale(18) }]}>
						{searchQuery.trim() ? 'Search Results' : 'Recent Notes'}
					</Text>

					<Pressable
						onPress={onOpenAddNote}
						style={[
							styles.addButton,
							{
								backgroundColor: colors.primary,
								paddingHorizontal: scale(14),
								paddingVertical: scale(8)
							}
						]}
					>
						<Ionicons name="add" size={scale(18)} color={colors.buttonText} />

						<Text style={[styles.addButtonText, { color: colors.buttonText, fontSize: scale(13) }]}>
							Add Note
						</Text>
					</Pressable>
				</View>

				<Text style={[styles.resultCount, { color: colors.textSecondary, fontSize: scale(13) }]}>
					{filteredNotes.length} notes
				</Text>
			</View>

			<FlatList
				data={filteredNotes}
				keyExtractor={(item) => item.id}
				extraData={filteredNotes}
				keyboardShouldPersistTaps="handled"
				contentContainerStyle={{
					paddingHorizontal: scale(15),
					paddingBottom: scale(100),
					flexGrow: 1
				}}
				showsVerticalScrollIndicator={false}
				numColumns={isTablet ? 2 : 1}
				key={isTablet ? 'tablet' : 'phone'}
				ListEmptyComponent={
					<View style={styles.emptyContainer}>
						<Ionicons name="search-outline" size={scale(42)} color={colors.textSecondary} />

						<Text style={[styles.emptyTitle, { color: colors.text }]}>No notes found</Text>

						<Text style={[styles.emptyText, { color: colors.textSecondary }]}>
							Try searching with another title or keyword.
						</Text>
					</View>
				}
				renderItem={({ item }) => (
					<View style={{ flex: 1, margin: scale(5) }}>
						<NoteCard
							title={item.title}
							content={item.content}
							date={item.date}
							onPress={() => onOpenEditNote(item)}
							isDarkMode={isDarkMode}
						/>
					</View>
				)}
			/>
		</SafeAreaView>
	);
}
