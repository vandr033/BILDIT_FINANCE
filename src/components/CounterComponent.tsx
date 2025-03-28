// src/CounterComponent.tsx
import { Button, View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { increment, decrement, reset, setValue } from '../store/counterSlice';

const CounterComponent = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Count: {count}</Text>
      <Button
        title="Increment"
        onPress={() => dispatch(increment())}
      />
      <Button
        title="Decrement"
        onPress={() => dispatch(decrement())}
      />
      <Button
        title="Reset"
        onPress={() => dispatch(reset())}
      />
      <Button
        title="Set Value"
        onPress={() => dispatch(setValue(10))}
      />
    </View>
  );
};

export default CounterComponent;
