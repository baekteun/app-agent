import { motion } from 'framer-motion';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Step } from './steps';
import { StepIndicator } from './step-indicator';
import { useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/badge';

interface InitialStepProps {
  steps: Step[];
  currentStepIndex: number;
  setCurrentStepIndex: (index: number) => void;
}

export function InitialStep({
  steps,
  currentStepIndex,
  setCurrentStepIndex,
}: InitialStepProps) {
  const t = useTranslations('aso');
  return (
    <div className="space-y-6">
      <StepIndicator
        steps={steps}
        currentStepIndex={currentStepIndex}
        setCurrentStepIndex={setCurrentStepIndex}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {steps.slice(1).map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card
              className="cursor-pointer hover:border-blue-500 transition-colors"
              onClick={() => setCurrentStepIndex(index + 1)}
            >
              <CardHeader>
                <div className="flex items-center gap-2 mb-4">
                  <div className="text-blue-500">{step.icon}</div>
                  {step.beta && (
                    <Badge
                      variant="secondary"
                      className="bg-blue-100 text-blue-700 hover:bg-blue-100"
                    >
                      {t('beta')}
                    </Badge>
                  )}
                </div>
                <CardTitle>{t(step.title)}</CardTitle>
                <CardDescription>{t(step.description)}</CardDescription>
              </CardHeader>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
