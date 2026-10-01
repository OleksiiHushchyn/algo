import { detail, type LocalizedDetail } from '../shared/detailed-content'

export const details: Record<string, LocalizedDetail> = {
  seen: detail(
    [
      'Imagine checking a pile of numbered stickers for repeats. Keep a notebook of numbers you have already seen. A set is like that notebook: each number is listed only once, and you can quickly ask whether it is there.',
      'Уявіть перевірку наліпок із числами на повтори. Ведіть записник уже побачених чисел. Множина схожа на такий записник: кожне число записане лише раз, і можна швидко перевірити його наявність.',
      'Представьте проверку наклеек с числами на повторы. Ведите записную книжку уже увиденных чисел. Множество похоже на такую книжку: каждое число записано лишь раз, и можно быстро проверить его наличие.',
    ],
    [
      [
        'Read [4, 1, 7, 4]. First 4 is not in the empty notebook, so write it down.',
        'Читаємо [4, 1, 7, 4]. Першої 4 немає в порожньому записнику, тому записуємо її.',
        'Читаем [4, 1, 7, 4]. Первой 4 нет в пустом блокноте, поэтому записываем её.',
      ],
      [
        'Neither 1 nor 7 is listed yet. Add them. The notebook now holds 4, 1, and 7.',
        'Ні 1, ні 7 ще не записані. Додаємо їх. Записник тепер містить 4, 1 та 7.',
        'Ни 1, ни 7 ещё не записаны. Добавляем их. Блокнот теперь содержит 4, 1 и 7.',
      ],
      [
        'The last 4 is already listed. That earlier entry proves this is a repeat: return true. If every number were new, we would finish and return false.',
        'Остання 4 вже записана. Попередній запис доводить, що це повтор: повертаємо true. Якби кожне число було новим, завершили б із false.',
        'Последняя 4 уже записана. Предыдущая запись доказывает, что это повтор: возвращаем true. Если бы каждое число было новым, закончили бы с false.',
      ],
    ],
    [
      'The notebook contains only earlier numbers when we check the current one. Adding first would spoil this rule: the number would find its own entry and falsely look like a repeat.',
      'Під час перевірки записник містить лише попередні числа. Якщо спершу додати поточне, воно знайде власний запис і помилково виглядатиме повтором.',
      'При проверке блокнот содержит только предыдущие числа. Если сначала добавить текущее, оно найдёт собственную запись и ошибочно покажется повтором.',
    ],
    [
      'seen is the set. has in JavaScript and contains in Java ask “already listed?”. add writes a number. A map goes one step further: it stores a value beside each key, like a count or position.',
      'seen — множина. has у JavaScript і contains у Java питають «уже записано?». add додає число. Таблиця йде далі: біля ключа зберігає значення, наприклад кількість чи позицію.',
      'seen — множество. has в JavaScript и contains в Java спрашивают «уже записано?». add добавляет число. Таблица идёт дальше: рядом с ключом хранит значение, например количество или позицию.',
    ],
  ),
  partner: detail(
    [
      'Imagine choosing two price tags totaling 10, but the tags are mixed up. For each price, write its position in a notebook. When a new price arrives, look up the exact partner it needs.',
      'Уявіть пошук двох цінників із сумою 10, але вони перемішані. Для кожної ціни записуємо позицію. Коли приходить нова, шукаємо в записнику саме потрібного партнера.',
      'Представьте поиск двух ценников с суммой 10, но они перемешаны. Для каждой цены записываем позицию. Когда приходит новая, ищем в блокноте именно нужного партнёра.',
    ],
    [
      [
        'Read [4, 1, 7, 3], target 10. Price 4 needs 6. None is stored, so write 4 → position 0.',
        'Читаємо [4, 1, 7, 3], ціль 10. Для 4 потрібна 6. Її немає, записуємо 4 → позиція 0.',
        'Читаем [4, 1, 7, 3], цель 10. Для 4 нужна 6. Её нет, записываем 4 → позиция 0.',
      ],
      [
        'Price 1 needs 9: absent, so store 1 → 1. Price 7 needs 3: absent, so store 7 → 2.',
        'Для 1 потрібна 9: немає, зберігаємо 1 → 1. Для 7 потрібна 3: немає, зберігаємо 7 → 2.',
        'Для 1 нужна 9: нет, сохраняем 1 → 1. Для 7 нужна 3: нет, сохраняем 7 → 2.',
      ],
      [
        'Price 3 needs 7. The notebook says 7 is at position 2. Return [2, 3]: those different positions contain 7 and 3.',
        'Для 3 потрібна 7. Записник каже: 7 на позиції 2. Повертаємо [2, 3]: ці різні позиції містять 7 та 3.',
        'Для 3 нужна 7. Блокнот говорит: 7 на позиции 2. Возвращаем [2, 3]: эти разные позиции содержат 7 и 3.',
      ],
    ],
    [
      'Subtraction tells us the only value that can complete the pair. Checking before storing prevents using the current item twice. Two separate 3s can still make 6 because the second sees the first.',
      'Віднімання дає єдине значення для завершення пари. Перевірка до запису не дозволяє використати поточний елемент двічі. Дві окремі 3 можуть дати 6: друга бачить першу.',
      'Вычитание даёт единственное значение для завершения пары. Проверка до записи не позволяет использовать текущий элемент дважды. Две отдельные 3 могут дать 6: вторая видит первую.',
    ],
    [
      'need = target − current value. seen maps values to earlier positions. Position 0 is real: test whether a key exists, rather than whether its stored position is truthy.',
      'need = target − поточне значення. seen пов’язує значення з попередніми позиціями. Позиція 0 справжня: перевіряйте наявність ключа, а не логічну істинність позиції.',
      'need = target − текущее значение. seen связывает значения с предыдущими позициями. Позиция 0 настоящая: проверяйте наличие ключа, а не логическую истинность позиции.',
    ],
  ),
  frequency: detail(
    [
      'Imagine two bags of letter tiles. They make anagrams if both bags contain exactly the same tiles, even in a different order. A counting notebook tells us how many copies of each letter we can spend.',
      'Уявіть два мішечки з літерами. Це анаграми, якщо в обох ті самі літери з тими самими кількостями, незалежно від порядку. Записник лічильників показує, скільки копій можна витратити.',
      'Представьте два мешочка с буквами. Это анаграммы, если в обоих те же буквы с тем же количеством, независимо от порядка. Блокнот счётчиков показывает, сколько копий можно потратить.',
    ],
    [
      [
        'Compare “aab” and “aba”. Their lengths match. Count the first bag: a → 2, b → 1.',
        'Порівнюємо “aab” і “aba”. Довжини однакові. Рахуємо перший мішечок: a → 2, b → 1.',
        'Сравниваем “aab” и “aba”. Длины одинаковые. Считаем первый мешочек: a → 2, b → 1.',
      ],
      [
        'Read the second bag. Spend a: one a remains. Spend b: no b remains. Spend a: no a remains. All requests succeeded.',
        'Читаємо другий. Витрачаємо a: лишається одна a. Витрачаємо b: b закінчилися. Витрачаємо a: a закінчилися. Усі запити виконано.',
        'Читаем второй. Тратим a: остаётся одна a. Тратим b: b закончились. Тратим a: a закончились. Все запросы выполнены.',
      ],
      [
        'For “abb” instead, the last b would ask for a copy we no longer have. Return false even though both bags use the same letter types.',
        'Для “abb” остання b попросила б копію, якої вже немає. Повертаємо false, хоча обидва мішечки містять ті самі види літер.',
        'Для “abb” последняя b попросила бы копию, которой уже нет. Возвращаем false, хотя оба мешочка содержат те же виды букв.',
      ],
    ],
    [
      'Equal lengths plus successfully spending every requested tile means nothing can be missing or left over. A set cannot do this job because it forgets how many copies exist.',
      'Однакові довжини й успішне витрачання кожної літери означають, що немає ні нестачі, ні залишку. Множина не впорається: вона забуває кількість копій.',
      'Одинаковые длины и успешное расходование каждой буквы означают, что нет ни нехватки, ни остатка. Множество не справится: оно забывает количество копий.',
    ],
    [
      'count maps a letter to its remaining copies. A missing key means zero. Add 1 when stocking the first bag; subtract 1 when spending for the second.',
      'count пов’язує літеру з кількістю копій, що залишилися. Відсутній ключ означає нуль. Додаємо 1 для першого мішечка, віднімаємо 1 для другого.',
      'count связывает букву с числом оставшихся копий. Отсутствующий ключ означает ноль. Прибавляем 1 для первого мешочка, вычитаем 1 для второго.',
    ],
  ),
  unique: detail(
    [
      'Imagine finding the first sticker that appears only once in a pile. You cannot decide when you first see it: another copy may be waiting near the bottom. Count first, then look for the first single copy.',
      'Уявіть пошук першої наліпки, що трапляється лише раз. При першій зустрічі вирішити не можна: ще одна копія може бути внизу. Спершу рахуємо, потім шукаємо першу одиночну.',
      'Представьте поиск первой наклейки, которая встречается лишь раз. При первой встрече решить нельзя: ещё одна копия может лежать внизу. Сначала считаем, потом ищем первую одиночную.',
    ],
    [
      [
        'Read all of “swiss”. The notebook ends with s → 3, w → 1, i → 1.',
        'Читаємо все “swiss”. У записнику наприкінці s → 3, w → 1, i → 1.',
        'Читаем всё “swiss”. В блокноте в конце s → 3, w → 1, i → 1.',
      ],
      [
        'Start again from the left. The first s is not unique because its count is 3. Skip it.',
        'Починаємо знову зліва. Перша s не унікальна, бо її кількість 3. Пропускаємо.',
        'Начинаем снова слева. Первая s не уникальна, потому что её количество 3. Пропускаем.',
      ],
      [
        'Next is w, whose count is 1. Return position 1. We do not choose i: it is unique too, but comes later.',
        'Далі w із кількістю 1. Повертаємо позицію 1. Не обираємо i: вона теж унікальна, але стоїть пізніше.',
        'Дальше w с количеством 1. Возвращаем позицию 1. Не выбираем i: она тоже уникальна, но стоит позже.',
      ],
    ],
    [
      'The first pass settles which letters are truly unique. The second pass follows the original order, so the first qualifying letter is the right answer. Two passes still visit only a small multiple of the input length.',
      'Перший прохід визначає справді унікальні літери. Другий іде початковим порядком, тому перша придатна літера — правильна відповідь. Два проходи — це лише подвійна довжина входу.',
      'Первый проход определяет действительно уникальные буквы. Второй идёт в исходном порядке, поэтому первая подходящая буква — правильный ответ. Два прохода — это лишь двойная длина входа.',
    ],
    [
      'The first loop builds count. The second reads s again and returns an index starting from 0. Return −1 if no count is 1, including for an empty string.',
      'Перший цикл будує count. Другий знову читає s й повертає індекс від 0. Якщо жодна кількість не дорівнює 1, повертаємо −1, зокрема для порожнього рядка.',
      'Первый цикл строит count. Второй снова читает s и возвращает индекс от 0. Если ни одно количество не равно 1, возвращаем −1, в том числе для пустой строки.',
    ],
  ),
  group: detail(
    [
      'Imagine sorting mixed word cards into labeled boxes. Words made from the same letters belong in the same box. We need a label that ignores letter order but still remembers every copy.',
      'Уявіть розкладання перемішаних карток зі словами в підписані коробки. Слова з тих самих літер належать одній коробці. Потрібен підпис, який ігнорує порядок, але пам’ятає всі копії.',
      'Представьте раскладывание перемешанных карточек со словами в подписанные коробки. Слова из тех же букв принадлежат одной коробке. Нужна подпись, игнорирующая порядок, но помнящая все копии.',
    ],
    [
      [
        'Take “eat”. Sort a copy of its letters into “aet”. Create box “aet” and put the original word “eat” inside.',
        'Беремо “eat”. Сортуємо копію літер у “aet”. Створюємо коробку “aet” й кладемо всередину початкове слово “eat”.',
        'Берём “eat”. Сортируем копию букв в “aet”. Создаём коробку “aet” и кладём внутрь исходное слово “eat”.',
      ],
      [
        '“tea” also sorts to “aet”. Use the existing box and add it beside “eat”. Do not replace the first word.',
        '“tea” теж сортується в “aet”. Беремо наявну коробку й додаємо поруч із “eat”. Не замінюємо перше слово.',
        '“tea” тоже сортируется в “aet”. Берём существующую коробку и добавляем рядом с “eat”. Не заменяем первое слово.',
      ],
      [
        '“bat” sorts to “abt”, so it gets a different box. Return the groups [eat, tea] and [bat]. Their order does not matter.',
        '“bat” сортується в “abt”, тому отримує іншу коробку. Повертаємо групи [eat, tea] та [bat]. Їхній порядок не важливий.',
        '“bat” сортируется в “abt”, поэтому получает другую коробку. Возвращаем группы [eat, tea] и [bat]. Их порядок не важен.',
      ],
    ],
    [
      'Sorting the same collection of letters always produces the same label. Repeated letters stay in the label: “aab” and “abb” lead to different boxes.',
      'Сортування однакового набору літер завжди дає однаковий підпис. Повторні літери лишаються: “aab” та “abb” ведуть до різних коробок.',
      'Сортировка одинакового набора букв всегда даёт одинаковую подпись. Повторные буквы остаются: “aab” и “abb” ведут в разные коробки.',
    ],
    [
      'key is the sorted-letter label. groups maps that label to a list of original words. Create a list only for a new key, then append each word to its list.',
      'key — підпис із відсортованих літер. groups пов’язує його зі списком початкових слів. Створюємо список лише для нового ключа, потім додаємо кожне слово.',
      'key — подпись из отсортированных букв. groups связывает её со списком исходных слов. Создаём список только для нового ключа, затем добавляем каждое слово.',
    ],
  ),
  mapping: detail(
    [
      'Imagine giving each letter a secret nickname. Every e must get the same nickname, and two different letters may not share one. We need a notebook for each direction: letter → nickname and nickname → letter.',
      'Уявіть таємні прізвиська для літер. Кожна e має отримувати те саме прізвисько, а дві різні літери не можуть його ділити. Потрібні записи в обидва боки: літера → прізвисько й навпаки.',
      'Представьте тайные прозвища для букв. Каждая e должна получать одно и то же прозвище, а две разные буквы не могут его делить. Нужны записи в обе стороны: буква → прозвище и обратно.',
    ],
    [
      [
        'Compare “egg” with “add”. The first pair suggests e → a. Record that a also belongs to e.',
        'Порівнюємо “egg” з “add”. Перша пара пропонує e → a. Також записуємо, що a належить e.',
        'Сравниваем “egg” с “add”. Первая пара предлагает e → a. Также записываем, что a принадлежит e.',
      ],
      [
        'The next pair suggests g → d. Both are free, so record both directions. The final g → d agrees with the existing records: true.',
        'Наступна пара пропонує g → d. Обидві вільні, записуємо обидва напрями. Остання g → d узгоджується із записами: true.',
        'Следующая пара предлагает g → d. Обе свободны, записываем оба направления. Последняя g → d согласуется с записями: true.',
      ],
      [
        'Now try “ab” → “cc”. a claims c first. When b tries to claim c, the reverse notebook says c already belongs to a. Reject it.',
        'Тепер “ab” → “cc”. a першою займає c. Коли b теж хоче c, зворотний запис каже, що c вже належить a. Відхиляємо.',
        'Теперь “ab” → “cc”. a первой занимает c. Когда b тоже хочет c, обратная запись говорит, что c уже принадлежит a. Отклоняем.',
      ],
    ],
    [
      'One direction prevents a letter from changing its nickname. The other prevents nickname sharing. Both rules are necessary for the same repeated-letter structure.',
      'Один напрям не дає літері змінювати прізвисько. Інший не дає ділити прізвисько. Обидва правила потрібні для однакової структури повторних літер.',
      'Одно направление не даёт букве менять прозвище. Другое не даёт делить прозвище. Оба правила нужны для одинаковой структуры повторяющихся букв.',
    ],
    [
      'forward and backward are the two notebooks. Check for a conflicting existing entry before saving. Unequal string lengths fail before any pairing starts.',
      'forward і backward — два записники. Перевіряємо суперечливі записи до збереження. Рядки різної довжини відхиляємо ще до утворення пар.',
      'forward и backward — два блокнота. Проверяем противоречащие записи до сохранения. Строки разной длины отклоняем ещё до образования пар.',
    ],
  ),
  prefix: detail(
    [
      'Imagine a scorekeeper writing the running total after every move. A prefix sum is just that total from the beginning. Subtract an earlier total from today’s total to find the score earned between those two moments. We want to count every stretch earning a target score.',
      'Уявіть суддю, який записує загальний рахунок після кожного ходу. Префіксна сума — це сума від початку. Відніміть попередній рахунок від поточного, щоб дізнатися результат між цими моментами. Рахуємо всі відрізки з потрібним результатом.',
      'Представьте судью, записывающего общий счёт после каждого хода. Префиксная сумма — сумма от начала. Вычтите предыдущий счёт из текущего, чтобы узнать результат между этими моментами. Считаем все отрезки с нужным результатом.',
    ],
    [
      [
        'Moves [1, −1, 1], target 1. Before any move, the total is 0. Record 0 as having occurred once; it represents a stretch starting at the beginning.',
        'Ходи [1, −1, 1], ціль 1. До ходів сума 0. Записуємо, що 0 трапився один раз: це дозволяє рахувати відрізки від самого початку.',
        'Ходы [1, −1, 1], цель 1. До ходов сумма 0. Записываем, что 0 встретился один раз: это позволяет считать отрезки с самого начала.',
      ],
      [
        'After the first 1, total = 1. We need an earlier total of 1 − 1 = 0. There is one: the first single-item stretch [1] works. Record total 1.',
        'Після першої 1 сума = 1. Потрібна попередня сума 1 − 1 = 0. Вона одна: перший одноелементний відрізок [1] підходить. Записуємо суму 1.',
        'После первой 1 сумма = 1. Нужна предыдущая сумма 1 − 1 = 0. Она одна: первый одноэлементный отрезок [1] подходит. Записываем сумму 1.',
      ],
      [
        'After −1, total = 0. We need an earlier −1, but none exists. Add no matches. Record this second occurrence of total 0.',
        'Після −1 сума = 0. Потрібна попередня −1, але її немає. Не додаємо збігів. Записуємо друге входження суми 0.',
        'После −1 сумма = 0. Нужна предыдущая −1, но её нет. Не добавляем совпадений. Записываем второе появление суммы 0.',
      ],
      [
        'After the final 1, total = 1. Earlier total 0 occurred twice, so add two matches: the whole [1, −1, 1] and the last [1]. Altogether: three stretches.',
        'Після останньої 1 сума = 1. Попередня сума 0 трапилася двічі, додаємо два збіги: весь [1, −1, 1] та останній [1]. Разом три відрізки.',
        'После последней 1 сумма = 1. Предыдущая сумма 0 встретилась дважды, добавляем два совпадения: весь [1, −1, 1] и последний [1]. Всего три отрезка.',
      ],
    ],
    [
      'current − earlier = target means earlier = current − target. Every occurrence of that earlier total marks a different start. Negative moves are fine because subtraction still works.',
      'current − earlier = target означає earlier = current − target. Кожне входження такої попередньої суми позначає інший початок. Від’ємні ходи дозволені: віднімання досі працює.',
      'current − earlier = target означает earlier = current − target. Каждое появление такой предыдущей суммы обозначает другое начало. Отрицательные ходы допустимы: вычитание всё ещё работает.',
    ],
    [
      'freq stores total → how many times it appeared. Add its count to answer before recording the current total. Otherwise target 0 would count an empty stretch using the current moment twice.',
      'freq зберігає сума → скільки разів трапилася. Додаємо кількість до answer до запису поточної суми. Інакше для цілі 0 порахували б порожній відрізок, використавши поточний момент двічі.',
      'freq хранит сумма → сколько раз встретилась. Добавляем количество к answer до записи текущей суммы. Иначе для цели 0 посчитали бы пустой отрезок, использовав текущий момент дважды.',
    ],
  ),
  consecutive: detail(
    [
      'Imagine mixed-up numbered puzzle pieces. You want the longest chain of numbers with no gaps: 1, 2, 3, 4. The pieces do not need to be neighbors in the original pile. Put the numbers in a set so each next piece is easy to find.',
      'Уявіть перемішані деталі пазла з числами. Потрібен найдовший ланцюжок без пропусків: 1, 2, 3, 4. Деталі не мають бути сусідами в початковій купі. Кладемо числа в множину для швидкого пошуку наступного.',
      'Представьте перемешанные детали пазла с числами. Нужна самая длинная цепочка без пропусков: 1, 2, 3, 4. Детали не обязаны соседствовать в исходной куче. Кладём числа в множество для быстрого поиска следующего.',
    ],
    [
      [
        'Input [100, 4, 200, 1, 3, 2]. A run can start at 1 because 0 is missing. Find 2, then 3, then 4. Stop because 5 is missing.',
        'Вхід [100, 4, 200, 1, 3, 2]. Ланцюжок може початися з 1, бо 0 немає. Знаходимо 2, потім 3, потім 4. Зупиняємося: 5 немає.',
        'Вход [100, 4, 200, 1, 3, 2]. Цепочка может начаться с 1, потому что 0 нет. Находим 2, затем 3, затем 4. Останавливаемся: 5 нет.',
      ],
      [
        'Do not start another walk at 2, 3, or 4: each has a predecessor, so it belongs to a run that starts earlier.',
        'Не починаємо новий обхід із 2, 3 чи 4: кожне має попередника й належить ланцюжку з ранішим початком.',
        'Не начинаем новый обход с 2, 3 или 4: у каждого есть предшественник, и оно принадлежит цепочке с более ранним началом.',
      ],
      [
        '100 and 200 each begin a one-item run. The best is the four-item run [1, 2, 3, 4], so return 4.',
        '100 та 200 починають одноелементні ланцюжки. Найкращий — із чотирьох [1, 2, 3, 4], повертаємо 4.',
        '100 и 200 начинают одноэлементные цепочки. Лучший — из четырёх [1, 2, 3, 4], возвращаем 4.',
      ],
    ],
    [
      'Starting only where the predecessor is missing walks each run once. The set removes duplicate starting values too. Otherwise we might rebuild the same long chain over and over.',
      'Починаючи лише там, де немає попередника, обходимо кожний ланцюжок один раз. Множина також прибирає повторні початки. Інакше могли б будувати той самий довгий ланцюжок багато разів.',
      'Начиная лишь там, где нет предшественника, обходим каждую цепочку один раз. Множество также убирает повторные начала. Иначе могли бы строить ту же длинную цепочку много раз.',
    ],
    [
      'x is a possible start. Skip it if x − 1 exists. end advances until a missing number, so end − x is the run length. The algorithm uses membership checks, not sorting.',
      'x — можливий початок. Пропускаємо його, якщо існує x − 1. end рухається до відсутнього числа, тому end − x — довжина. Алгоритм перевіряє наявність, а не сортує.',
      'x — возможное начало. Пропускаем его, если существует x − 1. end движется до отсутствующего числа, поэтому end − x — длина. Алгоритм проверяет наличие, а не сортирует.',
    ],
  ),
}
