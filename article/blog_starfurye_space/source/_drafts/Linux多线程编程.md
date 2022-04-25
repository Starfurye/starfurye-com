---
title: Linux多线程编程
top_img: 'https://i.loli.net/2020/06/05/MgJDtP1uNGdZ8Lf.jpg'
abbrlink: 7d944b04
categories:
tags:
cover:
---

## 基础知识

### 创建线程

```C
int pthread_create(pthread_t *tid, pthread_attr_t *attr, void *(*start_routine)(void *), void *arg);
```

创建一个线程，新线程从start_routine开始执行，新线程的ID保存在tid指向的位置。

* `tid`：指针, 新线程的ID保存在tid指向的位置。

* `attr`：线程属性。如果为空，则使用缺省的属性值。

* `start_routine`：该参数是一个函数指针, 新线程从start_routine开始执行。

* `arg`：提供给start_routine的参数。线程入口函数接收类型为void *类型的参数：

  ```C
  void *arg = "hello";
  pthread_create(&tid, NULL, start_routine, arg);
  
  void *start_routine(void *arg)
  {
      char *string = (char *)arg;
      puts(string); 								// 输出hello
  }
  ```

  可以向线程入口函数传递任意类型的参数，如整型变量、字符串变量、结构体变量（的地址）。

  ```C
  // int
  int ivalue = 123;
  void *arg = (void *) ivalue;
  pthread_create(&tid, NULL, start_routine, arg);
  // char*
  char *svalue = "string";
  void *arg = (void *) svalue;
  pthread_create(&tid, NULL, start_routine, arg);
  // struct*
  struct person {
      char *name; 
      int age;
  } p;
  void *arg = (void *) &p;
  pthread_create(&tid, NULL, start_routine, arg);
  ```

如果成功，返回0；如果失败，返回非0。



### 等待线程





## 第8题 pi1.c

使用2个线程根据莱布尼兹级数计算派，用户输入项数`calcnum`，主线程计算级数的前半部分（`[0, calcnum / 2)`)：

```C
void master() {
	int i;
	for (i = 0; i < calcnum / 2; ++i) {	// i为奇数：1/(2i+1)，i为偶数：-1/(2i+1)
		master_output += i & 1 ? -1.0 / (2 * i + 1) : 1.0 / (2 * i + 1);
	}
}
```

子线程计算级数的后半部分（`[calcnum / 2, calcnum)`）：

```C
void* worker(void* arg) {
	int i;
	for (i = calcnum / 2; i < calcnum; ++i) {
		worker_output += i & 1 ? -1.0 / (2 * i + 1) : 1.0 / (2 * i + 1);
	}
	return NULL;
}
```

主线程用`pthread_create()`创建子线程，用`pthread_join()`等待子线程运行结束，将结果累加再乘4即为派的结果。

```C
int main() 
{
	printf("n=");
	scanf("%d", &calcnum);
	pthread_t worker_tid;
	double total = 0;
	pthread_create(&worker_tid, NULL, worker, NULL);		// 子线程执行worker()
	master();												// 主线程执行master()
	pthread_join(worker_tid, NULL);
	total = (master_output + worker_output) * 4;
	printf("%.10lf\n", total);
	return 0;
}
```



## 第9题 pi2.c

使用N个线程根据莱布尼兹级数计算派，用户输入线程数`threadnum`和`calcnum`。

线程参数包括起始项和结束项：

```C
struct param {
    int start;
    int end;
};
```

每个用户计算`[start, end)`内各个项的值：

```C
void* calc(void* arg) {
    struct param* p;
    struct result* r;
    double sum = 0;
    int i;
    p = (struct param*)arg;
    for (i = p->start; i < p->end; ++i) {
        sum += i & 1 ? -1.0 / (2 * i + 1) : 1.0 / (2 * i + 1);
    }
    r = (struct result*)malloc(sizeof(struct result));	// 保存结果
    r->sum = sum;
    return r;
}
```

首先为各个线程分配空间：

```C
int main() 
{
    printf("number of workers=");
    scanf("%d", &threadnum);
    printf("n=");
    scanf("%d", &calcnum);
    
    pthread_t* workers;
    workers = (pthread_t*)malloc(threadnum * sizeof(pthread_t));
    struct param* allparams;
    allparams = (struct param*)malloc(threadnum * sizeof(struct param));
    ...
```

然后分配线程参数的起始项和结束项，注意，如果总项数为奇数，最后一项的结束项应该是所有项的最后一项。比如一共7项，分给三个线程，

* 第一个线程起始项为`0 * (7 / 3) = 0`，结束项为`1 * (7 / 3) = 2`;
* 第二个线程起始项为`1 * (7 / 3) = 2`，结束项为`2 * (7 / 3) = 4`;
* 第一个线程起始项为`2 * (7 / 3) = 4`，结束项应该为 7 而不是`3 * (7 / 3) = 6`;

```C
	...
    int i;
    for (i = 0; i < threadnum; ++i) {
        struct param* p;
        p = &allparams[i];
        p->start = i * (calcnum / threadnum);
        p->end = i == threadnum - 1 ? calcnum : (i + 1) * (calcnum / threadnum);
        pthread_create(&workers[i], NULL, calc, p);
    }
    double s = 0;
    for (i = 0; i < threadnum; ++i) {
        struct result* res;
        pthread_join(workers[i], (void **)&res);	// 等待所有线程结束
        s += res->sum;								// 统计所有线程的计算结果
        free(res);		// res points to r in calc(), r was in heap, so res should be free
    }
    free(workers); free(allparams);
    printf("%.10lf\n", s * 4);
    return 0;
}
```



## 第10题 sort.c

多线程排序，主线程创建两个子线程，子线程对第start项到end项使用选择排序，主线程将子线程的结果合并：

```C
void* selectSort(void* arg) {					// 选择排序
    struct param* p;
    int i, j, min;
    
    p = (struct param*)arg;
    for (i = p->start; i < p->end; ++i) {
        min = i;
        for (j = i; j < p->end; ++j) {
            if (array[min] > array[j]) {
                min = j;
            }
        }
        int temp = array[i];
        array[i] = array[min];
        array[min] = temp;
    }
	printArray(array, p->start, p->end);		// 输出排序结果
	return NULL;
}
void merge() {									// 合并
    int i = 0, j = total / 2, k = 0;
    while(i < total / 2 && j < total) 
        brrby[k++] = array[i] < array[j] ? array[i++] : array[j++];
    while (i < total / 2) brrby[k++] = array[i++];
    while (j < total) brrby[k++] = array[j++];
}
```

子线程1对数组前半部分排序，子线程2对数组后半部分排序，同样需要注意上面的奇数项问题。

```C
int main()
{
    printf("size of array=");
    scanf("%d", &total);
    pthread_t workers[THREAD_NUM];
    struct param params[THREAD_NUM];
    int i;
    
    array = (int*)malloc(total * sizeof(int));
    brrby = (int*)malloc(total * sizeof(int));
    for (i = 0; i < total; ++i) scanf("%d", array + i);
    for (i = 0; i < THREAD_NUM; ++i) {
        struct param* p;
        p = &params[i];
        p->start = i * (total / THREAD_NUM);
        p->end = i == THREAD_NUM - 1 ? total : (i + 1) * (total / THREAD_NUM);
        pthread_create(&workers[i], NULL, selectSort, p);	// 子线程排序
    }
    for (i = 0; i < THREAD_NUM; ++i) {
		void* _;
        pthread_join(workers[i], _);		// 返回结果没有用处又不能缺省
    }
    merge();								// 主线程合并
    free(array);
    printArray(brrby, 0, total);			// 打印最终结果
    free(brrby);
    return 0;
}
```



## 第11题 pc1.c

使用条件变量解决生产者、消费者问题。

系统中有3个线程：生产者、计算者、消费者，有2个容量为4的缓冲区，buffer1是生产者和计算者之间的缓冲区，而buffer2是计算者和消费者之间的缓冲区：

```C
#define CAPACITY 4
int buffer1[CAPACITY], buffer2[CAPACITY];
int in1, in2, out1, out2;
```

in1, out1和in2, out2分别存储两个缓冲区的输入输出。



判断缓冲区是满还是空，num为缓冲区编号：

```C
int buffer_is_empty(int num) {
	return num == 1 ? in1 == out1 : in2 == out2;
}
int buffer_is_full(int num) {
	return num == 1 ? (in1 + 1) % CAPACITY == out1 : (in2 + 1) % CAPACITY == out2;
}
```

从缓冲区放入和取出的函数，作为调用接口：

```C
void put_item(int num, int item) {
	if (num == 1) {
		buffer1[in1] = item;
		in1 = (in1 + 1) % CAPACITY;
	} else {
		buffer2[in2] = item;
		in2 = (in2 + 1) % CAPACITY;
	}
}
int get_item(int num) {
	int item;
	if (num == 1) {
		item = buffer1[out1];
		out1 = (out1 + 1) % CAPACITY;
	} else {
		item = buffer2[out2];
		out2 = (out2 + 1) % CAPACITY;
	}
	return item;
}
```

系统需要两个互斥量和4个条件变量：

```C
// mutex1是生产者和计算者之间的互斥量，而mutex2是计算者和消费者之间的互斥量：
pthread_mutex_t mutex1, mutex2;	
pthread_cond_t wait_empty_buffer1, wait_empty_buffer2;
pthread_cond_t wait_full_buffer1, wait_full_buffer2;
```

生产者生产'a'、'b'、'c'、‘d'、'e'、'f'、'g'、'h'八个字符，放入到buffer1：

```C
void* produce(void* arg) {
	int i, item;
	for (i = 0; i < 8; ++i) {
		pthread_mutex_lock(&mutex1);		// 锁住互斥量mutex1
        // 如果buffer1是满的，生产者等待条件变量wait_empty_buffer1
		while (buffer_is_full(1)) pthread_cond_wait(&wait_empty_buffer1, &mutex1);
		item = 'a' + i;
		put_item(1, item);							// 放入buffer1
		printf("produce item: %c\n", item);
        // 唤醒阻塞在wait_full_buffer1上的计算者线程
		pthread_cond_signal(&wait_full_buffer1);	
		pthread_mutex_unlock(&mutex1);				// 解锁
	}
	return NULL;
}
```

计算者首先从buffer1取出字符：

```C
void* edit(void* arg) {
	int i, item;
	for (i = 0; i < 8; ++i) {
		pthread_mutex_lock(&mutex1);				// 锁住互斥量mutex1
        // 如果buffer1是空的，计算者等待条件变量wait_full_buffer1
		while (buffer_is_empty(1)) pthread_cond_wait(&wait_full_buffer1, &mutex1);
		item = get_item(1);							// 从buffer1取出
		pthread_cond_signal(&wait_empty_buffer1);	// 唤醒阻塞在wait_empty_buffer1上的生产者线程
		pthread_mutex_unlock(&mutex1);				// 解锁
        ...
```

再将小写字符转换为大写字符，放入到buffer2：

```C
		...		
		pthread_mutex_lock(&mutex2);				// 锁住互斥量mutex2
		// 如果buffer2是满的，计算者等待条件变量wait_empty_buffer2
		while (buffer_is_full(2)) pthread_cond_wait(&wait_empty_buffer2, &mutex2);
		item -= 32;									// 转换为大写字符
		put_item(2, item);							// 放入buffer2
		printf("edited to %c\n", item);				
		// 唤醒阻塞在wait_full_buffer2上的消费者线程
		pthread_cond_signal(&wait_full_buffer2);	
		pthread_mutex_unlock(&mutex2);				// 解锁
	}
	return NULL;
}
```

消费者从buffer2取出字符，将其打印到屏幕上：

```C
void* consume(void* arg) {
	int i, item;
	for (i = 0; i < 8; ++i) {
		pthread_mutex_lock(&mutex2);				// 锁住互斥量mutex2
        // 如果buffer2是空的，计算者等待条件变量wait_full_buffer2
		while (buffer_is_empty(2)) pthread_cond_wait(&wait_full_buffer2, &mutex2);
		item = get_item(2);							// 从buffer2取出
		printf("cosume item %c\n", item);
        // 唤醒阻塞在wait_empty_buffer2上的计算者线程
		pthread_cond_signal(&wait_empty_buffer2);
		pthread_mutex_unlock(&mutex2);				// 解锁
	}
	return NULL;
}
```

主函数流程：初始化->创建子线程->开始生产、计算、消费->主线程等待子线程结束。

```C
int main()
{
	pthread_t editor_tid, consumer_tid;
	pthread_mutex_init(&mutex1, NULL);
	pthread_mutex_init(&mutex2, NULL);
	pthread_cond_init(&wait_empty_buffer1, NULL);
	pthread_cond_init(&wait_empty_buffer2, NULL);
	pthread_cond_init(&wait_full_buffer1, NULL);
	pthread_cond_init(&wait_full_buffer2, NULL);
    
	pthread_create(&editor_tid, NULL, edit, NULL);
	pthread_create(&consumer_tid, NULL, consume, NULL);
	produce(NULL);

	pthread_join(editor_tid, NULL);
	pthread_join(consumer_tid, NULL);
	return 0;
}
```



## 第12题 pc2.c

使用信号量解决生产者、计算者、消费者问题，各种函数接口和前一例子相同，使用条件变量来模拟信号量：

```C
typedef struct {
    int value;
    pthread_mutex_t mutex;			// 互斥量
    pthread_cond_t cond;			// 条件变量
} sema_t;
```

用以下阻塞（等待）、唤醒函数取代上面的放入、取出函数：

```C
void sema_init(sema_t* sema, int value) {
    sema->value = value;
    pthread_mutex_init(&sema->mutex, NULL);
    pthread_cond_init(&sema->cond, NULL);
}
void sema_wait(sema_t* sema) {
    pthread_mutex_lock(&sema->mutex);					// 锁住
    while (sema->value <= 0)
        pthread_cond_wait(&sema->cond, &sema->mutex);	// 信号量小于等于0，没有资源，阻塞
    sema->value--;										// 信号量减1,资源减1
    pthread_mutex_unlock(&sema->mutex);					// 解锁
}
void sema_signal(sema_t *sema)
{
    pthread_mutex_lock(&sema->mutex);					// 锁住
    ++sema->value;										// 信号量加1,资源加1
    pthread_cond_signal(&sema->cond);					// 唤醒条件变量
    pthread_mutex_unlock(&sema->mutex);					// 解锁
}
```

`mutex1_sema, mutex2_sema`用于互斥访问buffer1和buffer2，初始有1个资源。

`empty_buffer1_sema, empty_buffer2_sema` 用于线程同步，由于一开始缓冲区是空的，初始有`CAPACITY - 1`个资源。

`full_buffer1_sema, full_buffer2_sema`用于线程同步，由于一开始缓冲区是空的，初始有0个资源。

```C
sema_t mutex1_sema, mutex2_sema;
sema_t empty_buffer1_sema, empty_buffer2_sema;
sema_t full_buffer1_sema, full_buffer2_sema;
```

使用上面的信号量函数改写：

```C
void* produce(void* arg) {
	int i, item;
	for (i = 0; i < 8; ++i) {
		sema_wait(&empty_buffer1_sema);			// 申请信号量empty_buffer1_sema
        sema_wait(&mutex1_sema);				// 锁住mutex1_sema
		item = 'a' + i;
		put_item(1, item);
		printf("produce item: %c\n", item);
		sema_signal(&mutex1_sema);				// 解锁mutex1_sema
        sema_signal(&full_buffer1_sema);		// 唤醒被full_buffer1_sema阻塞的进程
	}
	return NULL;
}
void* edit(void* arg) {
	int i, item;
	for (i = 0; i < 8; ++i) {
        sema_wait(&full_buffer1_sema);			// 申请信号量full_buffer1_sema
        sema_wait(&mutex1_sema);				// 锁住mutex1_sema
		item = get_item(1);
		sema_signal(&mutex1_sema);				// 解锁mutex1_sema
        sema_signal(&empty_buffer1_sema);		// 唤醒被empty_buffer1_sema阻塞的进程
		
        sema_wait(&empty_buffer2_sema);			// 申请信号量empty_buffer2_sema
        sema_wait(&mutex2_sema);				// 锁住mutex2_sema
		item -= 32;
		put_item(2, item);
		printf("edited to %c\n", item);
		sema_signal(&mutex2_sema);				// 解锁mutex2_sema
        sema_signal(&full_buffer2_sema);		// 唤醒被full_buffer2_sema阻塞的进程
	}
	return NULL;
}
void* consume(void* arg) {
	int i, item;
	for (i = 0; i < 8; ++i) {
		sema_wait(&full_buffer2_sema);			// 申请信号量full_buffer2_sema
        sema_wait(&mutex2_sema);				// 锁住mutex2_sema
		item = get_item(2);
		printf("cosume item %c\n", item);
		sema_signal(&mutex2_sema);				// 解锁mutex2_sema
        sema_signal(&empty_buffer2_sema);		// 唤醒被empty_buffer2_sema阻塞的进程
	}
	return NULL;
}
```

```C
int main()
{
	pthread_t editor_tid, consumer_tid;

	sema_init(&mutex1_sema, 1);						// 初始资源数为1
    sema_init(&mutex2_sema, 1);
    sema_init(&empty_buffer1_sema, CAPACITY - 1);	// 初始资源数为CAPACITY - 1
    sema_init(&empty_buffer2_sema, CAPACITY - 1);
    sema_init(&full_buffer1_sema, 0);				// 初始资源数为0
    sema_init(&full_buffer2_sema, 0);
	pthread_create(&editor_tid, NULL, edit, NULL);
	pthread_create(&consumer_tid, NULL, consume, NULL);
	produce(NULL);
	pthread_join(editor_tid, NULL);
	pthread_join(consumer_tid, NULL);
	return 0;
}
```