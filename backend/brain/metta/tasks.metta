(task TaskA "Write proposal" "2024-09-01T10:00:00Z" High ())
(task TaskB "Review proposal" "2024-09-03T15:00:00Z" Medium (TaskA))
(task TaskC "Submit proposal" "2024-09-05T12:00:00Z" High (TaskB))
(task TaskD "Team meeting" "2024-09-02T09:00:00Z" Low ())
(task TaskE "Code implementation" "2024-09-07T17:00:00Z" High (TaskC))

(priority High 1)
(priority Medium 2)
(priority Low 3)

(= (getDependencies $task)
   (match &self ($task _ _ _ $deps) $deps))

(= (getDeadline $task)
   (match &self ($task _ _ $deadline _ ) $deadline))

(= (getPriority $task)
   (match &self ($task _ _ $priority _ ) $priority))
