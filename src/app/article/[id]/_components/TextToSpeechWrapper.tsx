'use client';

import TextToSpeech from './textToSpeech';

type Props = {
  text: string;
};

export default function TextToSpeechWrapper({ text }: Props) {
  return <TextToSpeech text={text} />;
}
