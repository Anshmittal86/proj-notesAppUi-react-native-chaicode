// React hooks
import { useState } from 'react';

// React Native core components and hooks
import { useColorScheme, View } from 'react-native';

// Project components
import NoteEditorScreen from '../../components/NoteEditorScreen/NoteEditorScreen';
import NotesListingScreen from '../../components/NotesListingScreen/NotesListingScreen';

// Project constants and types
import { DUMMY_NOTES, Note } from '../../constants/DummyData';

export default function App() {
	// State based screen switching is used only for assignment demo.
	// No external navigation library is used.
	const systemColorScheme = useColorScheme();

	const [activeScreen, setActiveScreen] = useState<'list' | 'editor'>('list');
	const [notes, setNotes] = useState<Note[]>(DUMMY_NOTES);
	const [selectedNote, setSelectedNote] = useState<Note | null>(null);
	const [isDarkMode, setIsDarkMode] = useState(systemColorScheme === 'dark');

	const handleOpenAddNote = () => {
		setSelectedNote(null);
		setActiveScreen('editor');
	};

	const handleOpenEditNote = (note: Note) => {
		setSelectedNote(note);
		setActiveScreen('editor');
	};

	const handleSaveNote = (noteData: { title: string; content: string }) => {
		if (selectedNote) {
			const updatedNotes = notes.map((note) =>
				note.id === selectedNote.id ?
					{
						...note,
						title: noteData.title,
						content: noteData.content
					}
				:	note
			);

			setNotes(updatedNotes);
		} else {
			const newNote: Note = {
				id: Date.now().toString(),
				title: noteData.title,
				content: noteData.content,
				date: new Date().toLocaleDateString('en-US', {
					month: 'short',
					day: 'numeric',
					year: 'numeric'
				})
			};

			setNotes([newNote, ...notes]);
		}

		setSelectedNote(null);
		setActiveScreen('list');
	};

	return (
		<View style={{ flex: 1 }}>
			{activeScreen === 'list' ?
				<NotesListingScreen
					notes={notes}
					isDarkMode={isDarkMode}
					setIsDarkMode={setIsDarkMode}
					onOpenAddNote={handleOpenAddNote}
					onOpenEditNote={handleOpenEditNote}
				/>
			:	<NoteEditorScreen
					note={selectedNote}
					isDarkMode={isDarkMode}
					onBack={() => setActiveScreen('list')}
					onSave={handleSaveNote}
				/>
			}
		</View>
	);
}
