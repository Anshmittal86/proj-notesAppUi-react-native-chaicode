import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import {
	FlatList,
	Pressable,
	StatusBar,
	Switch,
	Text,
	TextInput,
	useColorScheme,
	useWindowDimensions,
	View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors } from '../../constants/Colors';
import { DUMMY_NOTES } from '../../constants/DummyData';
import NoteCard from '../NoteCard/NoteCard';
import styles from './NotesListingScreen.styles';

interface NotesListingScreenProps {
	onOpenEditor: () => void;
}

export default function NotesListingScreen({ onOpenEditor }: NotesListingScreenProps) {
	const { width } = useWindowDimensions();
	const systemColorScheme = useColorScheme();

	const [searchQuery, setSearchQuery] = useState('');
	const [filteredNotes, setFilteredNotes] = useState(DUMMY_NOTES);
	const [isDarkMode, setIsDarkMode] = useState(systemColorScheme === 'dark');

	const colors = isDarkMode ? Colors.dark : Colors.light;

	const scale = (size: number) => {
		const baseWidth = Math.min(width, 430);
		return (baseWidth / 375) * size;
	};

	const isTablet = width > 768;

	useEffect(() => {
		const query = searchQuery.trim().toLowerCase();

		if (!query) {
			setFilteredNotes(DUMMY_NOTES);
			return;
		}

		const searchedNotes = DUMMY_NOTES.filter((note) => {
			const title = note.title.toLowerCase();
			const content = note.content.toLowerCase();
			const date = note.date.toLowerCase();

			return title.includes(query) || content.includes(query) || date.includes(query);
		});

		setFilteredNotes(searchedNotes);
	}, [searchQuery]);

	return (
		<SafeAreaView
			style={[styles.container, { backgroundColor: isDarkMode ? '#0F172A' : '#FDFDFF' }]}
		>
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
						<View
							style={[styles.moonCircle, { backgroundColor: isDarkMode ? '#4C1D95' : '#F3F4F6' }]}
						>
							<Ionicons name="moon" size={scale(14)} color={isDarkMode ? '#A78BFA' : '#6B7280'} />
						</View>

						{!isTablet && (
							<Text style={[styles.darkModeText, { color: colors.text, fontSize: scale(11) }]}>
								Dark Mode
							</Text>
						)}

						<Switch
							value={isDarkMode}
							onValueChange={setIsDarkMode}
							trackColor={{ false: '#E5E7EB', true: '#4C1D95' }}
							thumbColor="#FFFFFF"
							style={{ transform: [{ scale: scale(0.8) }] }}
						/>
					</View>
				</View>

				<View
					style={[
						styles.searchWrapper,
						{
							backgroundColor: isDarkMode ? '#1F2937' : '#F8FAFC',
							height: scale(50),
							borderColor: colors.border
						}
					]}
				>
					<Ionicons name="search-outline" size={scale(18)} color="#94A3B8" />

					<TextInput
						style={[styles.searchInput, { color: colors.text, fontSize: scale(15) }]}
						placeholder="Search notes..."
						placeholderTextColor="#94A3B8"
						value={searchQuery}
						onChangeText={setSearchQuery}
						autoCorrect={false}
						autoCapitalize="none"
					/>

					{searchQuery.length > 0 ?
						<Pressable onPress={() => setSearchQuery('')} hitSlop={8}>
							<Ionicons name="close-circle" size={scale(20)} color="#94A3B8" />
						</Pressable>
					:	<MaterialCommunityIcons name="tune-variant" size={scale(20)} color="#64748B" />}
				</View>

				<View
					style={[
						styles.statsContainer,
						{
							backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
							padding: scale(15)
						}
					]}
				>
					<View style={styles.statBox}>
						<View
							style={[
								styles.iconCircle,
								{
									backgroundColor: '#F5F3FF',
									width: scale(40),
									height: scale(40)
								}
							]}
						>
							<Ionicons name="document-text" size={scale(18)} color="#8B5CF6" />
						</View>

						<View>
							<Text style={[styles.statNumber, { color: colors.text, fontSize: scale(16) }]}>
								{DUMMY_NOTES.length}
							</Text>

							<Text
								style={[styles.statLabel, { color: colors.textSecondary, fontSize: scale(12) }]}
							>
								Notes
							</Text>
						</View>
					</View>

					<View style={styles.statDivider} />

					<View style={styles.statBox}>
						<View
							style={[
								styles.iconCircle,
								{
									backgroundColor: '#F0FDF4',
									width: scale(40),
									height: scale(40)
								}
							]}
						>
							<Ionicons name="pin" size={scale(18)} color="#22C55E" />
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

					<Text style={[styles.resultCount, { color: colors.textSecondary, fontSize: scale(13) }]}>
						{filteredNotes.length} notes
					</Text>
				</View>
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
							onPress={onOpenEditor}
							isDarkMode={isDarkMode}
						/>
					</View>
				)}
			/>
		</SafeAreaView>
	);
}
