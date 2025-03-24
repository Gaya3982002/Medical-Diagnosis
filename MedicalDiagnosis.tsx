import React, { useState } from 'react'
import { Button } from "./components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./components/ui/card"
import { Checkbox } from "/components/ui/checkbox"
import { Label } from "/components/ui/label"
import { Heart, Shield, Clock, Users, Play, Home, Search, Menu, User, Settings, Mail, Bell, Calendar, Star, Upload, Download, Trash, Edit, Plus, Minus, Check, X, ArrowRight } from "lucide-react"

const symptomOptions = [
  { label: 'Fever', value: 'fever' },
  { label: 'Cough', value: 'cough' },
  { label: 'Headache', value: 'headache' },
  { label: 'Nausea', value: 'nausea' },
  { label: 'Fatigue', value: 'fatigue' },
  { label: 'Sore Throat', value: 'sore-throat' },
  { label: 'Runny Nose', value: 'runny-nose' },
  { label: 'Diarrhea', value: 'diarrhea' },
  { label: 'Body Aches', value: 'body-aches' },
  { label: 'Loss of Smell', value: 'loss-of-smell' },
]

const diagnosisData = {
  fever: {
    diagnosis: 'Fever',
    remedies: ['Stay hydrated', 'Take over-the-counter pain relievers like acetaminophen or ibuprofen', 'Rest'],
    medicinalRemedies: ['Acetaminophen (Tylenol)', 'Ibuprofen (Advil)'],
    additionalInfo: 'If fever persists, consult a doctor.',
  },
  cough: {
    diagnosis: 'Cough',
    remedies: ['Drink plenty of fluids', 'Use a humidifier', 'Avoid irritants'],
    medicinalRemedies: ['Dextromethorphan (Robitussin)', 'Guaifenesin (Mucinex)'],
    additionalInfo: 'If cough is severe or persistent, consult a doctor.',
  },
  headache: {
    diagnosis: 'Headache',
    remedies: ['Stay hydrated', 'Rest in a quiet, dark room', 'Use over-the-counter pain relievers'],
    medicinalRemedies: ['Acetaminophen (Tylenol)', 'Ibuprofen (Advil)'],
    additionalInfo: 'If headache is severe or persistent, consult a doctor.',
  },
  nausea: {
    diagnosis: 'Nausea',
    remedies: ['Stay hydrated', 'Eat bland foods like crackers or toast', 'Avoid spicy or greasy foods'],
    medicinalRemedies: ['Antiemetics like Dramamine'],
    additionalInfo: 'If nausea is severe or persistent, consult a doctor.',
  },
  fatigue: {
    diagnosis: 'Fatigue',
    remedies: ['Get enough sleep', 'Eat a balanced diet', 'Exercise regularly'],
    medicinalRemedies: ['Iron supplements if anemia is suspected'],
    additionalInfo: 'If fatigue is severe or persistent, consult a doctor.',
  },
  'sore-throat': {
    diagnosis: 'Sore Throat',
    remedies: ['Gargle with warm salt water', 'Suck on throat lozenges', 'Stay hydrated'],
    medicinalRemedies: ['Throat lozenges', 'Gargle solutions'],
    additionalInfo: 'If sore throat is severe or persistent, consult a doctor.',
  },
  'runny-nose': {
    diagnosis: 'Runny Nose',
    remedies: ['Use saline nasal sprays', 'Drink plenty of fluids', 'Avoid allergens'],
    medicinalRemedies: ['Antihistamines like Claritin', 'Decongestants like Sudafed'],
    additionalInfo: 'If runny nose is severe or persistent, consult a doctor.',
  },
  diarrhea: {
    diagnosis: 'Diarrhea',
    remedies: ['Stay hydrated', 'Eat bland foods like bananas and rice', 'Avoid dairy and fatty foods'],
    medicinalRemedies: ['Loperamide (Imodium)'],
    additionalInfo: 'If diarrhea is severe or persistent, consult a doctor.',
  },
  'body-aches': {
    diagnosis: 'Body Aches',
    remedies: ['Stay hydrated', 'Rest', 'Use over-the-counter pain relievers'],
    medicinalRemedies: ['Acetaminophen (Tylenol)', 'Ibuprofen (Advil)'],
    additionalInfo: 'If body aches are severe or persistent, consult a doctor.',
  },
  'loss-of-smell': {
    diagnosis: 'Loss of Smell',
    remedies: ['Use saline nasal sprays', 'Smell strong scents like coffee or lemon', 'Stay hydrated'],
    medicinalRemedies: ['Saline nasal sprays'],
    additionalInfo: 'If loss of smell is severe or persistent, consult a doctor.',
  },
}

const getDiagnosis = (symptoms: string[]): { diagnosis: string, remedies: string[], medicinalRemedies: string[], additionalInfo: string } | null => {
  if (symptoms.includes('fever')) return diagnosisData.fever;
  if (symptoms.includes('cough')) return diagnosisData.cough;
  if (symptoms.includes('headache')) return diagnosisData.headache;
  if (symptoms.includes('nausea')) return diagnosisData.nausea;
  if (symptoms.includes('fatigue')) return diagnosisData.fatigue;
  if (symptoms.includes('sore-throat')) return diagnosisData['sore-throat'];
  if (symptoms.includes('runny-nose')) return diagnosisData['runny-nose'];
  if (symptoms.includes('diarrhea')) return diagnosisData.diarrhea;
  if (symptoms.includes('body-aches')) return diagnosisData['body-aches'];
  if (symptoms.includes('loss-of-smell')) return diagnosisData['loss-of-smell'];
  return null;
}

export default function MedicalDiagnosis() {
  const [symptoms, setSymptoms] = useState<string[]>([])
  const [diagnosis, setDiagnosis] = useState<{ diagnosis: string, remedies: string[], medicinalRemedies: string[], additionalInfo: string } | null>(null)
  const [feedback, setFeedback] = useState<string | null>(null)

  const handleSymptomChange = (value: string) => {
    if (symptoms.includes(value)) {
      setSymptoms(symptoms.filter(symptom => symptom !== value))
    } else {
      setSymptoms([...symptoms, value])
    }
  }

  const handleSubmit = () => {
    if (symptoms.length === 0) return

    const diag = getDiagnosis(symptoms)
    setDiagnosis(diag)
  }

  const handleFeedback = (value: string) => {
    setFeedback(value)
    // Here you can add logic to store feedback, e.g., send to a server
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Medical Diagnosis</CardTitle>
          <CardDescription>Enter your symptoms to get potential diagnoses and remedies.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => { e.preventDefault(); handleSubmit() }}>
            <div className="space-y-4">
              <Label htmlFor="symptoms">Select your symptoms:</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {symptomOptions.map(option => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <Checkbox id={option.value} checked={symptoms.includes(option.value)} onCheckedChange={() => handleSymptomChange(option.value)} />
                    <Label htmlFor={option.value}>{option.label}</Label>
                  </div>
                ))}
              </div>
              <Button type="submit" className="mt-4">Submit</Button>
            </div>
          </form>
        </CardContent>
        {diagnosis && (
          <CardContent>
            <CardTitle className="text-xl font-bold">Diagnosis: {diagnosis.diagnosis}</CardTitle>
            <CardDescription>Remedies:</CardDescription>
            <ul className="list-disc list-inside mt-2">
              {diagnosis.remedies.map((remedy, index) => (
                <li key={index}>{remedy}</li>
              ))}
            </ul>
            <CardDescription>Medicinal Remedies:</CardDescription>
            <ul className="list-disc list-inside mt-2">
              {diagnosis.medicinalRemedies.map((remedy, index) => (
                <li key={index}>{remedy}</li>
              ))}
            </ul>
            <p className="mt-4 text-muted-foreground">{diagnosis.additionalInfo}</p>
          </CardContent>
        )}
        {diagnosis && (
          <CardFooter className="flex justify-between items-center">
            <div className="space-y-2">
              <Label htmlFor="feedback">Feedback:</Label>
              <div className="flex items-center space-x-2">
                <Button variant="outline" onClick={() => handleFeedback('positive')}>👍</Button>
                <Button variant="outline" onClick={() => handleFeedback('negative')}>👎</Button>
              </div>
            </div>
            {feedback && <p className="text-muted-foreground">Thank you for your feedback!</p>}
          </CardFooter>
        )}
      </Card>
    </div>
  )
}