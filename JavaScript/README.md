## Separate Command and Query processing at Application Server

```
+---------------------+    +-------------+    +------------+
|                     |    |             |    |            |
|       Client        +--->+  Write API  +--->+            |
|                     |    |             |    |            |
|   Command { ... }   |    +-------------+    |            |
|                     |                       |  Database  |
|                     |    +-------------+    |            |
|   Query { ... }     |    |             |    |            |
|                     +--->+  Read API   +--->+            |
|                     |    |             |    |            |
+---------------------+    +-------------+    +------------+
```

* Use patterns: Command, Query Object
* Separate Read and Write APIs
* Scale Database: use multiple replicas for read
* Use Event Sourcing (message bus) for DB sync


## Scale Read API
```
+---------------------+    +-------------+    +------------+
|                     |    |             |    |            |
|       Client        +--->+  Write API  +--->+  Database  +---+
|                     |    |             |    |            |   |
|   Command { ... }   |    +-------------+    +------------+   |
|                     |                                        |
|                     |    +-------------+    +------------+   |
|   Query { ... }     |    |             |    |            |   |
|                     +--->+  Read API   +--->+  Read DB   +<--+
|                     |    |             |    |            |   |
|                     |    +-------------+    +------------+   |
|                     |                                        |
|                     |    +-------------+    +------------+   |
|                     |    |             |    |            |   |
|                     +--->+  Read API   +--->+  Read DB   +<--+
|                     |    |             |    |            |
+---------------------+    +-------------+    +------------+
```
