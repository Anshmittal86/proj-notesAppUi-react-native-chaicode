import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1
	},

	header: {
		paddingTop: 20
	},

	topRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 20
	},

	headerTitle: {
		fontWeight: '900',
		letterSpacing: -0.5
	},

	subHeaderTitle: {
		marginTop: 2,
		fontWeight: '500'
	},

	darkModeContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 6
	},

	moonCircle: {
		padding: 4,
		borderRadius: 10
	},

	darkModeText: {
		fontWeight: '600'
	},

	searchWrapper: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 10,
		borderRadius: 15,
		marginBottom: 20,
		borderWidth: 1
	},

	searchInput: {
		flex: 1,
		marginLeft: 10,
		fontWeight: '500'
	},

	statsContainer: {
		flexDirection: 'row',
		borderRadius: 20,
		justifyContent: 'space-around',
		alignItems: 'center',
		marginBottom: 25,
		...Platform.select({
			ios: {
				shadowColor: '#000',
				shadowOffset: { width: 0, height: 4 },
				shadowOpacity: 0.05,
				shadowRadius: 15
			},
			android: {
				elevation: 2
			}
		})
	},

	statBox: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10
	},

	iconCircle: {
		borderRadius: 12,
		justifyContent: 'center',
		alignItems: 'center'
	},

	statNumber: {
		fontWeight: '800'
	},

	statLabel: {
		fontWeight: '500'
	},

	statDivider: {
		width: 1,
		height: 25,
		backgroundColor: '#E2E8F0'
	},

	sectionHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 12
	},

	sectionTitle: {
		fontWeight: '800'
	},

	resultCount: {
		fontWeight: '700'
	},

	emptyContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 50,
		paddingHorizontal: 20
	},

	emptyTitle: {
		fontSize: 18,
		fontWeight: '800',
		marginTop: 12
	},

	emptyText: {
		fontSize: 14,
		textAlign: 'center',
		marginTop: 6,
		lineHeight: 20
	}
});

export default styles;
