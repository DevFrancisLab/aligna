(= (priorityLevel $priority)
   (match &self ($priority $level) $level))

(= (dependenciesCompleted $task $completed)
   (let (($deps (getDependencies $task)))
       (if (= $deps ())
           true
           (every (lambda ($d) (member $d $completed)) $deps))))

(= (sortTasks $tasks)
   (let (($sorted (sort $tasks
                        (lambda ($t1 $t2)
                          (let (($p1 (priorityLevel (getPriority $t1)))
                                ($p2 (priorityLevel (getPriority $t2)))
                                ($d1 (getDeadline $t1))
                                ($d2 (getDeadline $t2)))
                            (or (< $p1 $p2)
                                (and (= $p1 $p2) (< $d1 $d2)))))))))
       $sorted)

(= (scheduleTasks)
   (let (($tasks (match &self ($task _ _ _ _ ) $task)))
       (let loop (($remaining $tasks) ($completed ()))
           (if (= $remaining ())
               $completed
               (let (($next (first (filter (lambda ($t) (dependenciesCompleted $t $completed)) $remaining))))
                   (loop (remove $next $remaining) (append $completed ($next))))))))
