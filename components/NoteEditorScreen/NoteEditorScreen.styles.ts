import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: '#F8FAFC' },
	headerOverlay: { flex: 1, paddingTop: 20 },
	topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
	backButton: { backgroundColor: '#fff', borderRadius: 10 },
	saveButton: {
		backgroundColor: '#8B5CF6',
		flexDirection: 'row',
		borderRadius: 10,
		alignItems: 'center',
		gap: 6
	},
	saveText: { color: '#fff', fontWeight: 'bold' },
	headerTitleContainer: {},
	headerImage: {
		width: '100%',
		backgroundColor: '#F6F1E8'
	},
	mainTitle: { fontWeight: '900', color: '#1E1B4B' },
	subTitle: { color: '#475569', marginTop: 2 },

	contentCard: {
		backgroundColor: '#fff',
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
		minHeight: 600,
		...Platform.select({
			ios: {
				shadowColor: '#000',
				shadowOffset: { width: 0, height: -4 },
				shadowOpacity: 0.05,
				shadowRadius: 10
			},
			android: { elevation: 5 }
		})
	},
	label: { fontWeight: '700', color: '#1E1B4B', marginBottom: 8, marginTop: 12 },
	inputWrapper: {
		borderWidth: 1,
		borderColor: '#E2E8F0',
		borderRadius: 12,
		backgroundColor: '#fff'
	},
	titleInput: { color: '#333' },
	contentWrapper: { flex: 1 },
	contentHeader: { alignItems: 'flex-end', marginBottom: 5 },
	contentText: { flex: 1, color: '#333' },
	counter: { textAlign: 'right', color: '#94A3B8', marginTop: 2 },

	tagAction: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		backgroundColor: '#F1F5F9',
		borderRadius: 16
	},
	tagLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
	tagText: { color: '#475569' },

	toolGrid: { flexDirection: 'row', justifyContent: 'space-between' },
	toolItem: { alignItems: 'center', gap: 4 },
	toolLabel: { color: '#64748B' },

	tipBox: {
		flexDirection: 'row',
		backgroundColor: '#F5F3FF',
		borderRadius: 16,
		gap: 12,
		alignItems: 'center'
	},
	tipText: { flex: 1, color: '#4C1D95', lineHeight: 18 }
});

export default styles;
