import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  addTodo,
  removeTodo,
  editTodo,
  markDone,
} from './reduxToolkit/todoSlice';

const TodoList = () => {
  const [text, setText] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editedText, setEditedText] = useState('');

  const todos = useSelector(state => state.todo.todos);
  const dispatch = useDispatch();

  const handleAdd = () => {
    if (text.trim()) {
      dispatch(addTodo(text));
      setText('');
    }
  };

  const handleEdit = (id, currentText) => {
    setEditingId(id);
    setEditedText(currentText);
  };

  const handleSaveEdit = id => {
    if (editedText.trim()) {
      dispatch(editTodo({id, text: editedText}));
      setEditingId(null);
      setEditedText('');
    }
  };

  const markTodoDone = id => {
    dispatch(markDone(id));
  };

  const renderItem = ({item}) => (
    <View style={styles.todoItem}>
      {editingId === item.id ? (
        <TextInput
          value={editedText}
          onChangeText={setEditedText}
          style={styles.editInput}
        />
      ) : (
        <Text style={[styles.todoText, item.hasDone ? styles.hasDone : null]}>
          {item.text}
        </Text>
      )}

      <View style={styles.icons}>
        {editingId === item.id ? (
          <>
            <TouchableOpacity
              style={styles.icon}
              onPress={() => handleSaveEdit(item.id)}>
              <Text>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.icon}
              onPress={() => setEditingId(null)}>
              <Text>Cancel</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            {!item.hasDone && (
              <>
                <TouchableOpacity
                  style={styles.icon}
                  onPress={() => markTodoDone(item.id)}>
                  <Text>Done</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.icon}
                  onPress={() => handleEdit(item.id, item.text)}>
                  <Text>Edit</Text>
                </TouchableOpacity>
              </>
            )}
            <TouchableOpacity
              style={styles.icon}
              onPress={() => dispatch(removeTodo(item.id))}>
              <Text>Del</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Add todo..."
          value={text}
          onChangeText={setText}
        />
        <Button title="Add" onPress={handleAdd} />
      </View>

      <FlatList
        data={todos}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

export default TodoList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'center',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#999',
    flex: 1,
    marginRight: 10,
    paddingVertical: 4,
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  todoText: {
    fontSize: 18,
    flex: 1,
  },
  editInput: {
    borderBottomWidth: 1,
    flex: 1,
    marginRight: 10,
    paddingVertical: 4,
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  icon: {
    borderWidth: 0.5,
    borderRadius: 5,
    padding: 2,
  },
  hasDone: {
    textDecorationLine: 'line-through',
  },
});
