(= (getNextTask)
   (let (($schedule (scheduleTasks)))
       (first $schedule)))
