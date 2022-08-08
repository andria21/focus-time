import React, { useState } from 'react';
import { View, StyleSheet, Text, Platform, Vibration } from 'react-native';
import Countdown from '../components/Countdown';
import RoundedButton from '../components/RoundedButton';
import { ProgressBar } from 'react-native-paper';
import Timing from './Timing';

import { useKeepAwake } from 'expo-keep-awake';

const ONCE_SECOND_IN_MS = 1000;

const PATTERN = [
  1 * ONCE_SECOND_IN_MS,
  1 * ONCE_SECOND_IN_MS,
  1 * ONCE_SECOND_IN_MS,
  1 * ONCE_SECOND_IN_MS,
  1 * ONCE_SECOND_IN_MS,
];

export default Timer = ({ focusSubject, clearSubject, onTimerEnd }) => {
  useKeepAwake();

  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);
  const [minutes, setMinutes] = useState(0.1);

  const onEnd = (reset) => {
    Vibration.vibrate(PATTERN);
    setIsStarted(false);
    setProgress(1);
    reset();
    onTimerEnd(focusSubject);
  };

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown
          minutes={minutes}
          isPaused={!isStarted}
          onProgress={setProgress}
          onEnd={onEnd}
        />
        <View style={{ paddingTop: 40 }}>
          <Text style={styles.title}>Focusing on:</Text>
          <Text style={styles.task}>{focusSubject}</Text>
        </View>
      </View>
      <View style={{ paddingTop: 8 }}>
        <ProgressBar progress={progress} style={{ height: 8 }} />
      </View>
      <View style={styles.timingWrapper}>
        <Timing onChangeTime={setMinutes} />
      </View>
      <View style={styles.buttonWrapper}>
        {!isStarted && (
          <RoundedButton
            size={75}
            title="start"
            onPress={() => setIsStarted(true)}
          />
        )}
        {isStarted && (
          <RoundedButton
            size={75}
            title="pause"
            onPress={() => setIsStarted(false)}
          />
        )}
      </View>
      <View style={styles.clearSubjectWrapper}>
        <RoundedButton size={75} title="-" onPress={clearSubject} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  countdown: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
    paddingBottom: 40,
  },
  buttonWrapper: {
    flex: 0.3,
    flexDirection: 'row',
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
  },
  timingWrapper: {
    flex: 0.1,
    paddingTop: 10,
    paddingBottom: 20,
    flexDirection: 'row',
  },
  clearSubjectWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  task: {
    color: '#fff',
    textAlign: 'center',
    paddingBottom: 40,
  },
});
