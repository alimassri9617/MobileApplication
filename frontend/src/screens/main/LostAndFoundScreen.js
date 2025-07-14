// // import React, { useState, useEffect } from 'react';
// // import {
// //   View,
// //   Text,
// //   StyleSheet,
// //   FlatList,
// //   TouchableOpacity,
// //   RefreshControl,
// // } from 'react-native';
// // import {
// //   Card,
// //   Title,
// //   Paragraph,
// //   Button,
// //   FAB,
// //   Portal,
// //   Modal,
// //   TextInput,
// //   Chip,
// //   Searchbar,
// // } from 'react-native-paper';
// // import { Ionicons } from '@expo/vector-icons';
// // import { useLostAndFound } from '../../hooks/useLostAndFound';

// // const LostAndFoundScreen = () => {
// //   const {
// //     items,
// //     loading,
// //     fetchItems,
// //     createItem,
// //     deleteItem,
// //   } = useLostAndFound();

// //   const [refreshing, setRefreshing] = useState(false);
// //   const [modalVisible, setModalVisible] = useState(false);
// //   const [searchQuery, setSearchQuery] = useState('');
// //   const [filterType, setFilterType] = useState('all');
// //   const [newItem, setNewItem] = useState({
// //     title: '',
// //     description: '',
// //     type: 'lost',
// //     location: '',
// //     contactInfo: '',
// //     category: 'electronics',
// //   });

// //   const categories = [
// //     'electronics', 'clothing', 'books', 'accessories',
// //     'documents', 'keys', 'bags', 'other',
// //   ];

// //   useEffect(() => {
// //     fetchItems();
// //   }, []);

// //   const onRefresh = async () => {
// //     setRefreshing(true);
// //     await fetchItems();
// //     setRefreshing(false);
// //   };

// //   const handleCreateItem = async () => {
// //     if (!newItem.title.trim() || !newItem.description.trim()) {
// //       alert('Please fill in all required fields');
// //       return;
// //     }

// //     await createItem(newItem);
// //     setModalVisible(false);
// //     setNewItem({
// //       title: '',
// //       description: '',
// //       type: 'lost',
// //       location: '',
// //       contactInfo: '',
// //       category: 'electronics',
// //     });
// //     fetchItems();
// //   };

// //   const handleDeleteItem = async (itemId) => {
// //     await deleteItem(itemId);
// //     fetchItems();
// //   };

// //   const filteredItems = (Array.isArray(items) ? items : []).filter((item) => {
// //     const title = item.title || '';
// //     const description = item.description || '';
// //     const matchesSearch =
// //       title.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //       description.toLowerCase().includes(searchQuery.toLowerCase());
// //     const matchesFilter = filterType === 'all' || item.type === filterType;
// //     return matchesSearch && matchesFilter;
// //   });

// //   const renderItem = ({ item }) => (
// //     <Card style={styles.itemCard}>
// //       <Card.Content>
// //         <View style={styles.itemHeader}>
// //           <View style={styles.itemTitleContainer}>
// //             <Title style={styles.itemTitle}>{item.title}</Title>
// //             <Chip
// //               mode="outlined"
// //               style={[
// //                 styles.typeChip,
// //                 { backgroundColor: item.type === 'lost' ? '#ffebee' : '#e8f5e8' },
// //               ]}
// //               textStyle={{
// //                 color: item.type === 'lost' ? '#d32f2f' : '#2e7d32',
// //               }}
// //             >
// //               {item.type?.toUpperCase() || 'TYPE'}
// //             </Chip>
// //           </View>
// //           <TouchableOpacity
// //             onPress={() => handleDeleteItem(item._id)}
// //             style={styles.deleteButton}
// //           >
// //             <Ionicons name="trash-outline" size={20} color="#d32f2f" />
// //           </TouchableOpacity>
// //         </View>
// //         <Paragraph style={styles.description}>{item.description}</Paragraph>
// //         <View style={styles.itemDetails}>
// //           <View style={styles.detailRow}>
// //             <Ionicons name="location-outline" size={16} color="#666" />
// //             <Text style={styles.detailText}>{item.location || 'N/A'}</Text>
// //           </View>
// //           <View style={styles.detailRow}>
// //             <Ionicons name="pricetag-outline" size={16} color="#666" />
// //             <Text style={styles.detailText}>{item.category || 'Uncategorized'}</Text>
// //           </View>
// //           {item.contactInfo && (
// //             <View style={styles.detailRow}>
// //               <Ionicons name="call-outline" size={16} color="#666" />
// //               <Text style={styles.detailText}>{item.contactInfo}</Text>
// //             </View>
// //           )}
// //           <View style={styles.detailRow}>
// //             <Ionicons name="time-outline" size={16} color="#666" />
// //             <Text style={styles.detailText}>
// //               {new Date(item.createdAt).toLocaleDateString()}
// //             </Text>
// //           </View>
// //         </View>
// //       </Card.Content>
// //     </Card>
// //   );

// //   return (
// //     <View style={styles.container}>
// //       <View style={styles.header}>
// //         <Searchbar
// //           placeholder="Search items..."
// //           onChangeText={setSearchQuery}
// //           value={searchQuery}
// //           style={styles.searchBar}
// //         />
// //         <View style={styles.filterContainer}>
// //           {['all', 'lost', 'found'].map(type => (
// //             <TouchableOpacity
// //               key={type}
// //               style={[
// //                 styles.filterButton,
// //                 filterType === type && styles.activeFilter,
// //               ]}
// //               onPress={() => setFilterType(type)}
// //             >
// //               <Text
// //                 style={[styles.filterText, filterType === type && styles.activeFilterText]}
// //               >
// //                 {type.charAt(0).toUpperCase() + type.slice(1)}
// //               </Text>
// //             </TouchableOpacity>
// //           ))}
// //         </View>
// //       </View>

// // <FlatList
// //   data={filteredItems}
// //   keyExtractor={(item) => item._id}
// //   renderItem={renderItem}
// //   contentContainerStyle={{ padding: 16 }}
// //   refreshControl={
// //     <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
// //   }
// // />


// //       <FAB style={styles.fab} icon="plus" onPress={() => setModalVisible(true)} />

// //       <Portal>
// //         <Modal
// //           visible={modalVisible}
// //           onDismiss={() => setModalVisible(false)}
// //           contentContainerStyle={styles.modalContainer}
// //         >
// //           <Title style={styles.modalTitle}>Post New Item</Title>
// //           <TextInput
// //             label="Title *"
// //             value={newItem.title}
// //             onChangeText={(text) => setNewItem({ ...newItem, title: text })}
// //             style={styles.input}
// //             mode="outlined"
// //           />
// //           <TextInput
// //             label="Description *"
// //             value={newItem.description}
// //             onChangeText={(text) => setNewItem({ ...newItem, description: text })}
// //             style={styles.input}
// //             mode="outlined"
// //             multiline
// //           />
// //           <TextInput
// //             label="Location"
// //             value={newItem.location}
// //             onChangeText={(text) => setNewItem({ ...newItem, location: text })}
// //             style={styles.input}
// //             mode="outlined"
// //           />
// //           <TextInput
// //             label="Contact Info"
// //             value={newItem.contactInfo}
// //             onChangeText={(text) => setNewItem({ ...newItem, contactInfo: text })}
// //             style={styles.input}
// //             mode="outlined"
// //           />
// //           <View style={styles.typeSelector}>
// //             <Text style={styles.selectorLabel}>Type:</Text>
// //             <View style={styles.typeButtons}>
// //               {['lost', 'found'].map((type) => (
// //                 <TouchableOpacity
// //                   key={type}
// //                   style={[styles.typeButton, newItem.type === type && styles.activeTypeButton]}
// //                   onPress={() => setNewItem({ ...newItem, type })}
// //                 >
// //                   <Text
// //                     style={[styles.typeButtonText, newItem.type === type && styles.activeTypeButtonText]}
// //                   >
// //                     {type.toUpperCase()}
// //                   </Text>
// //                 </TouchableOpacity>
// //               ))}
// //             </View>
// //           </View>
// //           <View style={styles.categorySelector}>
// //             <Text style={styles.selectorLabel}>Category:</Text>
// //             <View style={styles.categoryGrid}>
// //               {categories.map((category) => (
// //                 <TouchableOpacity
// //                   key={category}
// //                   style={[styles.categoryButton, newItem.category === category && styles.activeCategoryButton]}
// //                   onPress={() => setNewItem({ ...newItem, category })}
// //                 >
// //                   <Text
// //                     style={[styles.categoryButtonText, newItem.category === category && styles.activeCategoryButtonText]}
// //                   >
// //                     {category}
// //                   </Text>
// //                 </TouchableOpacity>
// //               ))}
// //             </View>
// //           </View>
// //           <View style={styles.modalButtons}>
// //             <Button mode="outlined" onPress={() => setModalVisible(false)} style={styles.modalButton}>Cancel</Button>
// //             <Button mode="contained" onPress={handleCreateItem} style={styles.modalButton}>Post Item</Button>
// //           </View>
// //         </Modal>
// //       </Portal>
// //     </View>
// //   );
// // };


// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#f5f5f5',
// //   },
// //   header: {
// //     padding: 16,
// //     backgroundColor: '#fff',
// //     elevation: 2,
// //   },
// //   searchBar: {
// //     marginBottom: 12,
// //   },
// //   filterContainer: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-around',
// //   },
// //   filterButton: {
// //     paddingHorizontal: 20,
// //     paddingVertical: 8,
// //     borderRadius: 20,
// //     backgroundColor: '#f0f0f0',
// //   },
// //   activeFilter: {
// //     backgroundColor: '#1976d2',
// //   },
// //   filterText: {
// //     color: '#666',
// //     fontWeight: '500',
// //   },
// //   activeFilterText: {
// //     color: '#fff',
// //   },
// //   listContainer: {
// //     padding: 16,
// //   },
// //   itemCard: {
// //     marginBottom: 12,
// //     elevation: 2,
// //   },
// //   itemHeader: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     alignItems: 'flex-start',
// //     marginBottom: 8,
// //   },
// //   itemTitleContainer: {
// //     flex: 1,
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     flexWrap: 'wrap',
// //   },
// //   itemTitle: {
// //     fontSize: 18,
// //     marginRight: 8,
// //     marginBottom: 4,
// //   },
// //   typeChip: {
// //     height: 28,
// //   },
// //   deleteButton: {
// //     padding: 4,
// //   },
// //   description: {
// //     marginBottom: 12,
// //     color: '#666',
// //   },
// //   itemDetails: {
// //     gap: 6,
// //   },
// //   detailRow: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     gap: 8,
// //   },
// //   detailText: {
// //     color: '#666',
// //     fontSize: 14,
// //   },
// //   emptyContainer: {
// //     flex: 1,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     paddingTop: 100,
// //   },
// //   emptyText: {
// //     marginTop: 16,
// //     fontSize: 16,
// //     color: '#999',
// //   },
// //   fab: {
// //     position: 'absolute',
// //     margin: 16,
// //     right: 0,
// //     bottom: 0,
// //     backgroundColor: '#1976d2',
// //   },
// //   modalContainer: {
// //     backgroundColor: 'white',
// //     padding: 20,
// //     margin: 20,
// //     borderRadius: 8,
// //     maxHeight: '90%',
// //   },
// //   modalTitle: {
// //     textAlign: 'center',
// //     marginBottom: 20,
// //   },
// //   input: {
// //     marginBottom: 12,
// //   },
// //   typeSelector: {
// //     marginBottom: 16,
// //   },
// //   selectorLabel: {
// //     fontSize: 16,
// //     fontWeight: '500',
// //     marginBottom: 8,
// //     color: '#333',
// //   },
// //   typeButtons: {
// //     flexDirection: 'row',
// //     gap: 12,
// //   },
// //   typeButton: {
// //     flex: 1,
// //     paddingVertical: 12,
// //     paddingHorizontal: 16,
// //     borderRadius: 8,
// //     backgroundColor: '#f0f0f0',
// //     alignItems: 'center',
// //   },
// //   activeTypeButton: {
// //     backgroundColor: '#1976d2',
// //   },
// //   typeButtonText: {
// //     color: '#666',
// //     fontWeight: '500',
// //   },
// //   activeTypeButtonText: {
// //     color: '#fff',
// //   },
// //   categorySelector: {
// //     marginBottom: 20,
// //   },
// //   categoryGrid: {
// //     flexDirection: 'row',
// //     flexWrap: 'wrap',
// //     gap: 8,
// //   },
// //   categoryButton: {
// //     paddingVertical: 8,
// //     paddingHorizontal: 12,
// //     borderRadius: 16,
// //     backgroundColor: '#f0f0f0',
// //     marginBottom: 8,
// //   },
// //   activeCategoryButton: {
// //     backgroundColor: '#1976d2',
// //   },
// //   categoryButtonText: {
// //     color: '#666',
// //     fontSize: 12,
// //   },
// //   activeCategoryButtonText: {
// //     color: '#fff',
// //   },
// //   modalButtons: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     gap: 12,
// //   },
// //   modalButton: {
// //     flex: 1,
// //   },
// // });

// // export default LostAndFoundScreen;

// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//   RefreshControl,
//   ScrollView,
//   KeyboardAvoidingView,
//   Platform,
//   Image,
// } from 'react-native';
// import {
//   Card,
//   Title,
//   Paragraph,
//   Button,
//   FAB,
//   Portal,
//   Modal,
//   TextInput,
//   Chip,
//   Searchbar,
// } from 'react-native-paper';
// import { Ionicons } from '@expo/vector-icons';
// import * as ImagePicker from 'expo-image-picker';
// import Toast from 'react-native-toast-message';

// import { useLostAndFound } from '../../hooks/useLostAndFound';

// const categories = [
//   'electronics', 'clothing', 'books', 'accessories',
//   'documents', 'keys', 'bags', 'other',
// ];

// const LostAndFoundScreen = () => {
//   const {
//     items,
//     loading,
//     fetchItems,
//     createItem,
//     deleteItem,
//   } = useLostAndFound();

//   const [refreshing, setRefreshing] = useState(false);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filterType, setFilterType] = useState('all');
//   const [newItem, setNewItem] = useState({
//     title: '',
//     description: '',
//     type: 'lost',
//     location: '',
//     contactInfo: '',
//     category: 'electronics',
//     image: null,  // will hold { uri, name, type }
//   });

//   useEffect(() => {
//     fetchItems();
//   }, []);

//   // Refresh control
//   const onRefresh = async () => {
//     setRefreshing(true);
//     await fetchItems();
//     setRefreshing(false);
//   };

//   // Image picker handler
//   const pickImage = async () => {
//     // Request permission first
//     const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (permissionResult.status !== 'granted') {
//       Toast.show({
//         type: 'error',
//         text1: 'Permission denied',
//         text2: 'Permission to access media library is required!',
//       });
//       return;
//     }

//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       quality: 0.7,
//     });

//     if (!result.canceled) {
//       // For expo-image-picker v14+, result.assets[0] contains info
//       const asset = result.assets ? result.assets[0] : null;
//       if (asset) {
//         setNewItem({
//           ...newItem,
//           image: {
//             uri: asset.uri,
//             name: asset.fileName || 'photo.jpg',
//             type: asset.type || 'image/jpeg',
//           },
//         });
//       }
//     }
//   };

//   const handleCreateItem = async () => {
//     if (!newItem.title.trim() || !newItem.description.trim()) {
//       Toast.show({
//         type: 'error',
//         text1: 'Validation',
//         text2: 'Please fill in all required fields',
//       });
//       return;
//     }

//     // Send form data with image
//     await createItem(newItem);
//     setModalVisible(false);

//     // Reset form
//     setNewItem({
//       title: '',
//       description: '',
//       type: 'lost',
//       location: '',
//       contactInfo: '',
//       category: 'electronics',
//       image: null,
//     });
//     fetchItems();
//   };

//   const handleDeleteItem = async (itemId) => {
//     await deleteItem(itemId);
//     fetchItems();
//   };

//   const filteredItems = (Array.isArray(items) ? items : []).filter((item) => {
//     const title = item.title || '';
//     const description = item.description || '';
//     const matchesSearch =
//       title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       description.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesFilter = filterType === 'all' || item.type === filterType;
//     return matchesSearch && matchesFilter;
//   });

//   const renderItem = ({ item }) => (
//     <Card style={styles.itemCard}>
//       <Card.Content>
//         <View style={styles.itemHeader}>
//           <View style={styles.itemTitleContainer}>
//             <Title style={styles.itemTitle}>{item.title}</Title>
//             <Chip
//               mode="outlined"
//               style={[
//                 styles.typeChip,
//                 { backgroundColor: item.type === 'lost' ? '#ffebee' : '#e8f5e8' },
//               ]}
//               textStyle={{
//                 color: item.type === 'lost' ? '#d32f2f' : '#2e7d32',
//               }}
//             >
//               {item.type?.toUpperCase() || 'TYPE'}
//             </Chip>
//           </View>
//           <TouchableOpacity
//             onPress={() => handleDeleteItem(item._id)}
//             style={styles.deleteButton}
//           >
//             <Ionicons name="trash-outline" size={20} color="#d32f2f" />
//           </TouchableOpacity>
//         </View>
//         <Paragraph style={styles.description}>{item.description}</Paragraph>

//         {item.image && (
//           <Image
//             source={{ uri: item.image }}
//             style={{ width: '100%', height: 150, marginBottom: 8, borderRadius: 6 }}
//             resizeMode="cover"
//           />
//         )}

//         <View style={styles.itemDetails}>
//           <View style={styles.detailRow}>
//             <Ionicons name="location-outline" size={16} color="#666" />
//             <Text style={styles.detailText}>{item.location || 'N/A'}</Text>
//           </View>
//           <View style={styles.detailRow}>
//             <Ionicons name="pricetag-outline" size={16} color="#666" />
//             <Text style={styles.detailText}>{item.category || 'Uncategorized'}</Text>
//           </View>
//           {item.contactInfo && (
//             <View style={styles.detailRow}>
//               <Ionicons name="call-outline" size={16} color="#666" />
//               <Text style={styles.detailText}>{item.contactInfo}</Text>
//             </View>
//           )}
//           <View style={styles.detailRow}>
//             <Ionicons name="time-outline" size={16} color="#666" />
//             <Text style={styles.detailText}>
//               {new Date(item.createdAt).toLocaleDateString()}
//             </Text>
//           </View>
//         </View>
//       </Card.Content>
//     </Card>
//   );

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Searchbar
//           placeholder="Search items..."
//           onChangeText={setSearchQuery}
//           value={searchQuery}
//           style={styles.searchBar}
//         />
//         <View style={styles.filterContainer}>
//           {['all', 'lost', 'found'].map(type => (
//             <TouchableOpacity
//               key={type}
//               style={[
//                 styles.filterButton,
//                 filterType === type && styles.activeFilter,
//               ]}
//               onPress={() => setFilterType(type)}
//             >
//               <Text
//                 style={[styles.filterText, filterType === type && styles.activeFilterText]}
//               >
//                 {type.charAt(0).toUpperCase() + type.slice(1)}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>
//       </View>

//       <FlatList
//         data={filteredItems}
//         keyExtractor={(item) => item._id}
//         renderItem={renderItem}
//         contentContainerStyle={{ padding: 16 }}
//         refreshControl={
//           <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//         }
//         ListEmptyComponent={() => (
//           <View style={styles.emptyContainer}>
//             <Text style={styles.emptyText}>
//               {loading ? 'Loading items...' : 'No items found.'}
//             </Text>
//           </View>
//         )}
//       />

//       <FAB style={styles.fab} icon="plus" onPress={() => setModalVisible(true)} />

//       <Portal>
//         <Modal
//           visible={modalVisible}
//           onDismiss={() => setModalVisible(false)}
//           contentContainerStyle={styles.modalContainer}
//         >
//           <KeyboardAvoidingView
//             behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//             style={{ flex: 1 }}
//           >
//             <ScrollView>
//               <Title style={styles.modalTitle}>Post New Item</Title>
//               <TextInput
//                 label="Title *"
//                 value={newItem.title}
//                 onChangeText={(text) => setNewItem({ ...newItem, title: text })}
//                 style={styles.input}
//                 mode="outlined"
//               />
//               <TextInput
//                 label="Description *"
//                 value={newItem.description}
//                 onChangeText={(text) => setNewItem({ ...newItem, description: text })}
//                 style={styles.input}
//                 mode="outlined"
//                 multiline
//               />
//               <TextInput
//                 label="Location"
//                 value={newItem.location}
//                 onChangeText={(text) => setNewItem({ ...newItem, location: text })}
//                 style={styles.input}
//                 mode="outlined"
//               />
//               <TextInput
//                 label="Contact Info"
//                 value={newItem.contactInfo}
//                 onChangeText={(text) => setNewItem({ ...newItem, contactInfo: text })}
//                 style={styles.input}
//                 mode="outlined"
//               />

//               <Button
//                 mode="outlined"
//                 icon="image"
//                 onPress={pickImage}
//                 style={{ marginBottom: 12 }}
//               >
//                 {newItem.image ? 'Change Image' : 'Pick an Image'}
//               </Button>
//               {newItem.image && (
//                 <Image
//                   source={{ uri: newItem.image.uri }}
//                   style={{ width: '100%', height: 150, marginBottom: 12, borderRadius: 6 }}
//                 />
//               )}

//               <View style={styles.typeSelector}>
//                 <Text style={styles.selectorLabel}>Type:</Text>
//                 <View style={styles.typeButtons}>
//                   {['lost', 'found'].map((type) => (
//                     <TouchableOpacity
//                       key={type}
//                       style={[styles.typeButton, newItem.type === type && styles.activeTypeButton]}
//                       onPress={() => setNewItem({ ...newItem, type })}
//                     >
//                       <Text
//                         style={[styles.typeButtonText, newItem.type === type && styles.activeTypeButtonText]}
//                       >
//                         {type.toUpperCase()}
//                       </Text>
//                     </TouchableOpacity>
//                   ))}
//                 </View>
//               </View>

//               <View style={styles.categorySelector}>
//                 <Text style={styles.selectorLabel}>Category:</Text>
//                 <View style={styles.categoryGrid}>
//                   {categories.map((category) => (
//                     <TouchableOpacity
//                       key={category}
//                       style={[styles.categoryButton, newItem.category === category && styles.activeCategoryButton]}
//                       onPress={() => setNewItem({ ...newItem, category })}
//                     >
//                       <Text
//                         style={[styles.categoryButtonText, newItem.category === category && styles.activeCategoryButtonText]}
//                       >
//                         {category}
//                       </Text>
//                     </TouchableOpacity>
//                   ))}
//                 </View>
//               </View>

//               <View style={styles.modalButtons}>
//                 <Button
//                   mode="outlined"
//                   onPress={() => setModalVisible(false)}
//                   style={styles.modalButton}
//                 >
//                   Cancel
//                 </Button>
//                 <Button
//                   mode="contained"
//                   onPress={handleCreateItem}
//                   style={styles.modalButton}
//                   loading={loading}
//                 >
//                   Post Item
//                 </Button>
//               </View>
//             </ScrollView>
//           </KeyboardAvoidingView>
//         </Modal>
//       </Portal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//   },
//   header: {
//     padding: 16,
//     backgroundColor: '#fff',
//     elevation: 2,
//   },
//   searchBar: {
//     marginBottom: 12,
//   },
//   filterContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//   },
//   filterButton: {
//     paddingHorizontal: 20,
//     paddingVertical: 8,
//     borderRadius: 20,
//     backgroundColor: '#f0f0f0',
//   },
//   activeFilter: {
//     backgroundColor: '#1976d2',
//   },
//   filterText: {
//     color: '#666',
//     fontWeight: '500',
//   },
//   activeFilterText: {
//     color: '#fff',
//   },
//   listContainer: {
//     padding: 16,
//   },
//   itemCard: {
//     marginBottom: 12,
//     elevation: 2,
//   },
//   itemHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'flex-start',
//     marginBottom: 8,
//   },
//   itemTitleContainer: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//     flexWrap: 'wrap',
//   },
//   itemTitle: {
//     fontSize: 18,
//     marginRight: 8,
//     marginBottom: 4,
//   },
//   typeChip: {
//     height: 28,
//   },
//   deleteButton: {
//     padding: 4,
//   },
//   description: {
//     marginBottom: 12,
//     color: '#666',
//   },
//   itemDetails: {
//     gap: 6,
//   },
//   detailRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//     marginBottom: 4,
//   },
//   detailText: {
//     color: '#666',
//     fontSize: 14,
//   },
//   emptyContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingTop: 100,
//   },
//   emptyText: {
//     marginTop: 16,
//     fontSize: 16,
//     color: '#999',
//   },
//   fab: {
//     position: 'absolute',
//     margin: 16,
//     right: 0,
//     bottom: 0,
//     backgroundColor: '#1976d2',
//   },
//   modalContainer: {
//     backgroundColor: 'white',
//     padding: 20,
//     margin: 20,
//     borderRadius: 8,
//     maxHeight: '90%',
//   },
//   modalTitle: {
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   input: {
//     marginBottom: 12,
//   },
//   typeSelector: {
//     marginBottom: 16,
//   },
//   selectorLabel: {
//     fontSize: 16,
//     fontWeight: '500',
//     marginBottom: 8,
//     color: '#333',
//   },
//   typeButtons: {
//     flexDirection: 'row',
//     gap: 12,
//   },
//   typeButton: {
//     flex: 1,
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     borderRadius: 8,
//     backgroundColor: '#f0f0f0',
//     alignItems: 'center',
//   },
//   activeTypeButton: {
//     backgroundColor: '#1976d2',
//   },
//   typeButtonText: {
//     color: '#666',
//     fontWeight: '500',
//   },
//   activeTypeButtonText: {
//     color: '#fff',
//   },
//   categorySelector: {
//     marginBottom: 20,
//   },
//   categoryGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     gap: 8,
//   },
//   categoryButton: {
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//     borderRadius: 16,
//     backgroundColor: '#f0f0f0',
//     marginBottom: 8,
//     marginRight: 8,
//   },
//   activeCategoryButton: {
//     backgroundColor: '#1976d2',
//   },
//   categoryButtonText: {
//     color: '#666',
//     fontSize: 12,
//   },
//   activeCategoryButtonText: {
//     color: '#fff',
//   },
//   modalButtons: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     gap: 12,
//   },
//   modalButton: {
//     flex: 1,
//   },
// });

// export default LostAndFoundScreen;





// LostAndFoundScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
  Image,
} from 'react-native';
import {
  Card,
  Title,
  Paragraph,
  Button,
  FAB,
  Portal,
  Modal,
  TextInput,
  Chip,
  Searchbar,
} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useLostAndFound } from '../../hooks/useLostAndFound';

const LostAndFoundScreen = () => {
  const {
    items,
    loading,
    fetchItems,
    createItem,
    deleteItem,
  } = useLostAndFound();

  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [newItem, setNewItem] = useState({
    title: '',
    description: '',
    type: 'lost',
    location: '',
    phoneNumber: '',
    category: 'electronics',
  });

  const categories = [
    'electronics', 'clothing', 'books', 'accessories',
    'documents', 'keys', 'bags', 'other',
  ];

  useEffect(() => {
    fetchItems();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchItems();
    setRefreshing(false);
  };

  const handleCreateItem = async () => {
    if (!newItem.title.trim() || !newItem.description.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    await createItem(newItem);
    setModalVisible(false);
    setNewItem({
      title: '',
      description: '',
      type: 'lost',
      location: '',
      phoneNumber: '',
      category: 'electronics',
    });
    fetchItems();
  };

  const handleDeleteItem = async (itemId) => {
    await deleteItem(itemId);
    fetchItems();
  };

  const filteredItems = (Array.isArray(items) ? items : []).filter((item) => {
    const title = item.title || '';
    const description = item.description || '';
    const matchesSearch =
      title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === 'all' || item.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const renderItem = ({ item }) => (
    <Card style={styles.itemCard}>
      <Card.Content>
        <View style={styles.itemHeader}>
          <View style={styles.itemTitleContainer}>
            <Title style={styles.itemTitle}>{item.title}</Title>
            <Chip
              mode="outlined"
              style={[
                styles.typeChip,
                { backgroundColor: item.type === 'lost' ? '#ffebee' : '#e8f5e8' },
              ]}
              textStyle={{
                color: item.type === 'lost' ? '#d32f2f' : '#2e7d32',
              }}
            >
              {item.type?.toUpperCase() || 'TYPE'}
            </Chip>
          </View>
          <TouchableOpacity
            onPress={() => handleDeleteItem(item._id)}
            style={styles.deleteButton}
          >
            <Ionicons name="trash-outline" size={20} color="#d32f2f" />
          </TouchableOpacity>
        </View>
        <Paragraph style={styles.description}>{item.description}</Paragraph>
        <View style={styles.itemDetails}>
          <View style={styles.detailRow}>
            <Ionicons name="location-outline" size={16} color="#666" />
            <Text style={styles.detailText}>{item.location || 'N/A'}</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="pricetag-outline" size={16} color="#666" />
            <Text style={styles.detailText}>{item.category || 'Uncategorized'}</Text>
          </View>
          {item.phoneNumber && (
            <View style={styles.detailRow}>
              <Ionicons name="call-outline" size={16} color="#666" />
              <Text style={styles.detailText}>{item.phoneNumber}</Text>
            </View>
          )}
          <View style={styles.detailRow}>
            <Ionicons name="time-outline" size={16} color="#666" />
            <Text style={styles.detailText}>
              {new Date(item.createdAt).toLocaleDateString()}
            </Text>
          </View>
          <Image source={{ uri: item.image }} style={{ width: '100%', height: 150, marginBottom: 8, borderRadius: 6 }} resizeMode="cover" /> 

          
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Searchbar
          placeholder="Search items..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
        />
        <View style={styles.filterContainer}>
          {['all', 'lost', 'found'].map(type => (
            <TouchableOpacity
              key={type}
              style={[
                styles.filterButton,
                filterType === type && styles.activeFilter,
              ]}
              onPress={() => setFilterType(type)}
            >
              <Text
                style={[styles.filterText, filterType === type && styles.activeFilterText]}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />

      <FAB style={styles.fab} icon="plus" onPress={() => setModalVisible(true)} />

      <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={() => setModalVisible(false)}
          contentContainerStyle={styles.modalContainer}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            <Title style={styles.modalTitle}>Post New Item</Title>
            <TextInput
              label="Title *"
              value={newItem.title}
              onChangeText={(text) => setNewItem({ ...newItem, title: text })}
              style={styles.input}
              mode="outlined"
            />
            <TextInput
              label="Description *"
              value={newItem.description}
              onChangeText={(text) => setNewItem({ ...newItem, description: text })}
              style={styles.input}
              mode="outlined"
              multiline
            />
            <TextInput
              label="Location"
              value={newItem.location}
              onChangeText={(text) => setNewItem({ ...newItem, location: text })}
              style={styles.input}
              mode="outlined"
            />
            <TextInput
              label="Phone Number"
              value={newItem.phoneNumber}
              onChangeText={(text) => setNewItem({ ...newItem, phoneNumber: text })}
              style={styles.input}
              mode="outlined"
            />
            <View style={styles.typeSelector}>
              <Text style={styles.selectorLabel}>Type:</Text>
              <View style={styles.typeButtons}>
                {['lost', 'found'].map((type) => (
                  <TouchableOpacity
                    key={type}
                    style={[styles.typeButton, newItem.type === type && styles.activeTypeButton]}
                    onPress={() => setNewItem({ ...newItem, type })}
                  >
                    <Text
                      style={[styles.typeButtonText, newItem.type === type && styles.activeTypeButtonText]}
                    >
                      {type.toUpperCase()}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <View style={styles.categorySelector}>
              <Text style={styles.selectorLabel}>Category:</Text>
              <View style={styles.categoryGrid}>
                {categories.map((category) => (
                  <TouchableOpacity
                    key={category}
                    style={[styles.categoryButton, newItem.category === category && styles.activeCategoryButton]}
                    onPress={() => setNewItem({ ...newItem, category })}
                  >
                    <Text
                      style={[styles.categoryButtonText, newItem.category === category && styles.activeCategoryButtonText]}
                    >
                      {category}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <View style={styles.modalButtons}>
              <Button mode="outlined" onPress={() => setModalVisible(false)} style={styles.modalButton}>Cancel</Button>
              <Button mode="contained" onPress={handleCreateItem} style={styles.modalButton}>Post Item</Button>
            </View>
          </ScrollView>
        </Modal>
      </Portal>
    </View>
  );
};


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { padding: 16, backgroundColor: '#fff', elevation: 2 },
  searchBar: { marginBottom: 12 },
  filterContainer: { flexDirection: 'row', justifyContent: 'space-around' },
  filterButton: { paddingHorizontal: 20, paddingVertical: 8, borderRadius: 20, backgroundColor: '#f0f0f0' },
  activeFilter: { backgroundColor: '#1976d2' },
  filterText: { color: '#666', fontWeight: '500' },
  activeFilterText: { color: '#fff' },
  itemCard: { marginBottom: 12, elevation: 2 },
  itemHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 },
  itemTitleContainer: { flex: 1, flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' },
  itemTitle: { fontSize: 18, marginRight: 8, marginBottom: 4 },
  typeChip: { height: 28 },
  deleteButton: { padding: 4 },
  description: { marginBottom: 12, color: '#666' },
  itemDetails: { gap: 6 },
  detailRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  detailText: { color: '#666', fontSize: 14 },
  fab: { position: 'absolute', margin: 16, right: 0, bottom: 0, backgroundColor: '#1976d2' },
  modalContainer: { backgroundColor: 'white', padding: 20, margin: 20, borderRadius: 8, maxHeight: '90%' },
  modalTitle: { textAlign: 'center', marginBottom: 20 },
  input: { marginBottom: 12 },
  typeSelector: { marginBottom: 16 },
  selectorLabel: { fontSize: 16, fontWeight: '500', marginBottom: 8, color: '#333' },
  typeButtons: { flexDirection: 'row', gap: 12 },
  typeButton: { flex: 1, paddingVertical: 12, paddingHorizontal: 16, borderRadius: 8, backgroundColor: '#f0f0f0', alignItems: 'center' },
  activeTypeButton: { backgroundColor: '#1976d2' },
  typeButtonText: { color: '#666', fontWeight: '500' },
  activeTypeButtonText: { color: '#fff' },
  categorySelector: { marginBottom: 20 },
  categoryGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  categoryButton: { paddingVertical: 8, paddingHorizontal: 12, borderRadius: 16, backgroundColor: '#f0f0f0', marginBottom: 8 },
  activeCategoryButton: { backgroundColor: '#1976d2' },
  categoryButtonText: { color: '#666', fontSize: 12 },
  activeCategoryButtonText: { color: '#fff' },
  modalButtons: { flexDirection: 'row', justifyContent: 'space-between', gap: 12 },
  modalButton: { flex: 1 },
});

export default LostAndFoundScreen;
