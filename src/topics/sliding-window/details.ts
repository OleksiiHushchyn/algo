import { detail, type LocalizedDetail } from '../shared/detailed-content'

export const details: Record<string, LocalizedDetail> = {
  fixed: detail(
    [
      'Imagine a small frame covering exactly three neighboring cards. Slide it one card to the right. Most cards stay inside: only one leaves and one enters. We can update their total instead of adding everything again.',
      'Уявіть рамку, що накриває рівно три сусідні картки. Зсуньте її праворуч на одну картку. Більшість залишиться: одна вийде, одна ввійде. Можна оновити суму, а не рахувати все заново.',
      'Представьте рамку, накрывающую ровно три соседние карточки. Сдвиньте её вправо на одну карточку. Большинство останется: одна выйдет, одна войдёт. Можно обновить сумму, а не считать всё заново.',
    ],
    [
      [
        'For [2, 1, 5, 1, 3, 2], the first three cards sum to 2 + 1 + 5 = 8. This is our first best total.',
        'Для [2, 1, 5, 1, 3, 2] перші три дають 2 + 1 + 5 = 8. Це перша найкраща сума.',
        'Для [2, 1, 5, 1, 3, 2] первые три дают 2 + 1 + 5 = 8. Это первая лучшая сумма.',
      ],
      [
        'Slide: subtract the old 2 and add the new 1. Total 7. Slide again: subtract 1, add 3. Total 9 for [5, 1, 3].',
        'Зсуваємо: віднімаємо стару 2 й додаємо нову 1. Сума 7. Ще раз: віднімаємо 1, додаємо 3. Маємо 9 для [5, 1, 3].',
        'Сдвигаем: вычитаем старую 2 и добавляем новую 1. Сумма 7. Ещё раз: вычитаем 1, добавляем 3. Получаем 9 для [5, 1, 3].',
      ],
      [
        'The last frame totals 6. Keep the largest total, 9. If asked for the average, divide by three: 3.',
        'Остання рамка дає 6. Зберігаємо найбільшу суму — 9. Якщо потрібне середнє, ділимо на три: 3.',
        'Последняя рамка даёт 6. Сохраняем наибольшую сумму — 9. Если нужно среднее, делим на три: 3.',
      ],
    ],
    [
      'Each update removes exactly what left and adds exactly what arrived, so the total stays correct. Negative numbers work too; the first best total must be a real window, not an invented zero.',
      'Кожне оновлення прибирає саме те, що вийшло, й додає саме те, що ввійшло. Тому сума правильна. Від’ємні числа теж працюють: перший максимум має бути справжньою сумою, а не вигаданим нулем.',
      'Каждое обновление убирает ровно то, что вышло, и добавляет то, что вошло. Поэтому сумма верна. Отрицательные числа тоже работают: первый максимум должен быть настоящей суммой, а не придуманным нулём.',
    ],
    [
      'k is the frame size. right is the entering position, and right − k is the leaving position. sum describes the current frame; best remembers the best frame so far.',
      'k — розмір рамки. right — позиція, що входить, right − k — та, що виходить. sum описує поточну рамку, best пам’ятає найкращу.',
      'k — размер рамки. right — входящая позиция, right − k — выходящая. sum описывает текущую рамку, best помнит лучшую.',
    ],
  ),
  unique: detail(
    [
      'Imagine collecting letter stickers in a row, but your frame may contain only one of each letter. Stretch the right edge to collect more. If a repeat enters, move the left edge until the extra copy is gone.',
      'Уявіть ряд наліпок із літерами. У рамці можна мати лише одну копію кожної літери. Розширюємо правий край. Якщо входить повтор, рухаємо лівий, поки зайва копія не вийде.',
      'Представьте ряд наклеек с буквами. В рамке можно иметь только одну копию каждой буквы. Расширяем правый край. Если входит повтор, двигаем левый, пока лишняя копия не выйдет.',
    ],
    [
      [
        'Read “abcaac”. First a, then b, then c: “abc” has no repeats and length 3.',
        'Читаємо “abcaac”. Спершу a, потім b, потім c: “abc” не має повторів і має довжину 3.',
        'Читаем “abcaac”. Сначала a, затем b, затем c: “abc” без повторов, длина 3.',
      ],
      [
        'The next a makes “abca”. Remove the old a from the left. Now “bca” is allowed, also length 3.',
        'Наступна a дає “abca”. Прибираємо стару a зліва. Тепер “bca” дозволене, його довжина теж 3.',
        'Следующая a даёт “abca”. Убираем старую a слева. Теперь “bca” допустимо, длина тоже 3.',
      ],
      [
        'Another a makes “bcaa”. Removing only b does not fix it! Remove b, c, and the older a until only one a remains. The best length is still 3.',
        'Ще одна a дає “bcaa”. Прибрати лише b недостатньо! Прибираємо b, c та старішу a, поки залишиться одна a. Найкраща довжина досі 3.',
        'Ещё одна a даёт “bcaa”. Убрать только b недостаточно! Убираем b, c и старую a, пока останется одна a. Лучшая длина по-прежнему 3.',
      ],
    ],
    [
      'Before each new letter, the frame has no repeats. Only the arriving letter can break the rule. Shrink just enough to repair it, then measure the longest allowed frame ending here.',
      'До нової літери рамка не має повторів. Порушити правило може лише нова літера. Стискаємо рівно настільки, щоб виправити це, й вимірюємо найдовшу дозволену рамку з цим кінцем.',
      'До новой буквы рамка не имеет повторов. Нарушить правило может только новая буква. Сжимаем ровно настолько, чтобы исправить это, и измеряем самую длинную допустимую рамку с этим концом.',
    ],
    [
      'count stores how many copies of each letter are inside. while repeats removals until the rule is restored. right − left + 1 counts both endpoints.',
      'count зберігає кількість копій кожної літери всередині. while повторює видалення, доки правило не відновиться. right − left + 1 враховує обидва краї.',
      'count хранит количество копий каждой буквы внутри. while повторяет удаления, пока правило не восстановится. right − left + 1 учитывает оба края.',
    ],
  ),
  'minimum-sum': detail(
    [
      'Imagine a row of bags containing positive numbers of marbles. You need at least eight marbles, using as few neighboring bags as possible. Collect bags on the right; once you have enough, try returning bags on the left.',
      'Уявіть ряд мішечків, у кожному є кульки. Треба хоча б вісім кульок із якомога меншої кількості сусідніх мішечків. Додаємо справа; коли вистачає, пробуємо прибрати зліва.',
      'Представьте ряд мешочков, в каждом есть шарики. Нужно хотя бы восемь шариков из как можно меньшего числа соседних мешочков. Добавляем справа; когда хватает, пробуем убрать слева.',
    ],
    [
      [
        'Bags [2, 1, 5, 3], target 8. Collect 2, then 1, then 5: total 8 in three bags. Remember length 3.',
        'Мішечки [2, 1, 5, 3], ціль 8. Беремо 2, потім 1, потім 5: сума 8 у трьох мішечках. Пам’ятаємо довжину 3.',
        'Мешочки [2, 1, 5, 3], цель 8. Берём 2, затем 1, затем 5: сумма 8 в трёх мешочках. Запоминаем длину 3.',
      ],
      [
        'Remove the left 2: total 6, no longer enough. Add the next 3: [1, 5, 3] totals 9.',
        'Прибираємо ліву 2: сума 6, вже мало. Додаємо наступну 3: [1, 5, 3] дає 9.',
        'Убираем левую 2: сумма 6, уже мало. Добавляем следующую 3: [1, 5, 3] даёт 9.',
      ],
      [
        'Remove 1: [5, 3] still totals 8, using only two bags. Save 2. Remove 5 and the total is too small. Answer: 2.',
        'Прибираємо 1: [5, 3] досі дає 8, лише два мішечки. Зберігаємо 2. Без 5 сума вже замала. Відповідь: 2.',
        'Убираем 1: [5, 3] всё ещё даёт 8, всего два мешочка. Сохраняем 2. Без 5 сумма уже мала. Ответ: 2.',
      ],
    ],
    [
      'Positive values make the direction predictable: adding increases the total, removing decreases it. Negative values would break this promise. Record a good window before shrinking it.',
      'Додатні значення роблять напрям передбачуваним: додавання збільшує суму, видалення зменшує. Від’ємні порушили б цю умову. Записуємо добрий відрізок до стискання.',
      'Положительные значения делают направление предсказуемым: добавление увеличивает сумму, удаление уменьшает. Отрицательные нарушили бы это условие. Записываем хороший отрезок до сжатия.',
    ],
    [
      'best begins as infinity, meaning “no answer yet”. min keeps the shorter length. If no window ever works, return 0 rather than infinity.',
      'best починається з нескінченності: «відповіді ще немає». min зберігає меншу довжину. Якщо жодне вікно не підійшло, повертаємо 0 замість нескінченності.',
      'best начинается с бесконечности: «ответа ещё нет». min сохраняет меньшую длину. Если ни одно окно не подошло, возвращаем 0 вместо бесконечности.',
    ],
  ),
  budget: detail(
    [
      'Imagine a row of working lights (1) and broken lights (0). You have k repair stickers. Find the longest neighboring row you could light up. Count needed repairs; you do not actually have to change the lights.',
      'Уявіть ряд справних лампочок (1) і зламаних (0). Є k наліпок для ремонту. Шукаємо найдовший сусідній ряд, який можна засвітити. Рахуємо потрібні ремонти, самі лампочки не змінюємо.',
      'Представьте ряд исправных лампочек (1) и сломанных (0). Есть k наклеек для ремонта. Ищем самый длинный соседний ряд, который можно зажечь. Считаем нужные ремонты, сами лампочки не меняем.',
    ],
    [
      [
        'For [1, 0, 1, 1, 0, 1] and one repair, the first four lights need one sticker. Length 4 is allowed.',
        'Для [1, 0, 1, 1, 0, 1] й одного ремонту перші чотири лампочки потребують однієї наліпки. Довжина 4 дозволена.',
        'Для [1, 0, 1, 1, 0, 1] и одного ремонта первые четыре лампочки требуют одной наклейки. Длина 4 допустима.',
      ],
      [
        'Add the next 0: now two repairs are needed. Remove the first 1; still two repairs. Remove the old 0; now only one repair is needed.',
        'Додаємо наступний 0: тепер треба два ремонти. Прибираємо першу 1: досі два. Прибираємо старий 0: тепер потрібен лише один.',
        'Добавляем следующий 0: теперь нужны два ремонта. Убираем первую 1: всё ещё два. Убираем старый 0: теперь нужен только один.',
      ],
      [
        'The remaining [1, 1, 0] is allowed. Add the final 1 for another length-4 row. The answer is 4.',
        'Залишок [1, 1, 0] дозволений. Додаємо останню 1, знову довжина 4. Відповідь — 4.',
        'Остаток [1, 1, 0] допустим. Добавляем последнюю 1, снова длина 4. Ответ — 4.',
      ],
    ],
    [
      'Any row needing too many repairs is invalid. Moving left until the repair count fits gives the longest valid row ending at the current right edge.',
      'Ряд із завеликою кількістю ремонтів не підходить. Рухаємо лівий край, доки ремонтів не стане достатньо мало: це найдовший дозволений ряд із поточним правим краєм.',
      'Ряд с избыточным числом ремонтов не подходит. Двигаем левый край, пока ремонтов не станет достаточно мало: это самый длинный допустимый ряд с текущим правым краем.',
    ],
    [
      'zeros counts broken lights inside the window, not in the whole array. k is the repair budget. If k is 0, even one zero forces the window to shrink.',
      'zeros рахує зламані лампочки всередині вікна, не всього масиву. k — запас ремонтів. Якщо k дорівнює 0, навіть один нуль змушує стискати вікно.',
      'zeros считает сломанные лампочки внутри окна, не всего массива. k — запас ремонтов. Если k равен 0, даже один ноль заставляет сжимать окно.',
    ],
  ),
  distinct: detail(
    [
      'Imagine collecting fruit from neighboring trees with only two baskets. Each basket can hold many fruits, but only one type. We need to count types, not individual fruits.',
      'Уявіть збір фруктів із сусідніх дерев лише у два кошики. Кошик уміщує багато фруктів, але тільки одного виду. Рахуємо види, а не окремі фрукти.',
      'Представьте сбор фруктов с соседних деревьев лишь в две корзины. Корзина вмещает много фруктов, но только одного вида. Считаем виды, а не отдельные фрукты.',
    ],
    [
      [
        'Types [1, 2, 1, 3, 3, 2]. The first [1, 2, 1] fits: two type-1 fruits and one type-2 fruit use two baskets.',
        'Види [1, 2, 1, 3, 3, 2]. Перші [1, 2, 1] підходять: два фрукти виду 1 й один виду 2 займають два кошики.',
        'Виды [1, 2, 1, 3, 3, 2]. Первые [1, 2, 1] подходят: два фрукта вида 1 и один вида 2 занимают две корзины.',
      ],
      [
        'Add type 3: three baskets would be needed. Remove the first 1, but another 1 remains, so there are still three types.',
        'Додаємо вид 3: потрібні три кошики. Прибираємо першу 1, але інша 1 залишається, тому видів досі три.',
        'Добавляем вид 3: нужны три корзины. Убираем первую 1, но другая 1 остаётся, поэтому видов всё ещё три.',
      ],
      [
        'Remove 2: its count becomes zero, freeing its basket. Now [1, 3] fits. Keep scanning; the longest allowed stretch has length 3.',
        'Прибираємо 2: її кількість стає нульовою, кошик звільняється. Тепер [1, 3] підходить. Продовжуємо: найдовший дозволений відрізок має довжину 3.',
        'Убираем 2: её количество становится нулевым, корзина освобождается. Теперь [1, 3] подходит. Продолжаем: самый длинный допустимый отрезок имеет длину 3.',
      ],
    ],
    [
      'A type leaves the window only when its last fruit leaves. Counts let us know when that happens. Shrinking until at most k types remain restores the basket rule.',
      'Вид зникає з вікна лише після виходу його останнього фрукта. Лічильники показують цей момент. Стискаємо, доки залишиться не більше k видів.',
      'Вид исчезает из окна только после выхода его последнего фрукта. Счётчики показывают этот момент. Сжимаем, пока останется не более k видов.',
    ],
    [
      'count maps a fruit type to its quantity. Delete entries whose quantity is zero, so count.size really equals the number of occupied baskets.',
      'count пов’язує вид фрукта з кількістю. Видаляйте записи з нульовою кількістю, щоб count.size справді дорівнював кількості зайнятих кошиків.',
      'count связывает вид фрукта с количеством. Удаляйте записи с нулевым количеством, чтобы count.size действительно равнялся числу занятых корзин.',
    ],
  ),
  anagrams: detail(
    [
      'Imagine a recipe asking for letter tiles a, b, and c. Their order does not matter, but the number of each tile does. Slide a frame with exactly as many spaces as the recipe needs.',
      'Уявіть рецепт із плиток-літер a, b і c. Порядок не важливий, але кількість кожної плитки важлива. Рухаємо рамку рівно такого розміру, як потребує рецепт.',
      'Представьте рецепт из плиток-букв a, b и c. Порядок не важен, но количество каждой плитки важно. Двигаем рамку ровно такого размера, как требует рецепт.',
    ],
    [
      [
        'Pattern “cba” needs one a, one b, one c. In text “zbacx”, the first full frame is “zba”: it has z instead of c.',
        'Зразок “cba” потребує по одній a, b і c. У тексті “zbacx” перша повна рамка — “zba”: замість c вона має z.',
        'Образец “cba” требует по одной a, b и c. В тексте “zbacx” первая полная рамка — “zba”: вместо c в ней z.',
      ],
      [
        'Slide right: z leaves, c enters. The frame becomes “bac”. Its letter counts match the recipe, so return true.',
        'Зсуваємо праворуч: z виходить, c входить. Рамка стає “bac”. Кількості літер збігаються з рецептом, повертаємо true.',
        'Сдвигаем вправо: z выходит, c входит. Рамка становится “bac”. Количества букв совпадают с рецептом, возвращаем true.',
      ],
      [
        'For a recipe “aab”, “abb” would fail: both use a and b, but the recipe needs two a tiles, not two b tiles.',
        'Для рецепта “aab” варіант “abb” не підходить: обидва мають a та b, але потрібні дві a, а не дві b.',
        'Для рецепта “aab” вариант “abb” не подходит: оба содержат a и b, но нужны две a, а не две b.',
      ],
    ],
    [
      'Equal-sized windows with equal letter counts can be rearranged into the same word. Comparing just 26 counters takes the same small amount of work no matter how long the text is.',
      'Вікна однакового розміру з однаковими кількостями літер можна переставити в те саме слово. Перевірка лише 26 лічильників потребує однаково мало роботи незалежно від довжини тексту.',
      'Окна одинакового размера с одинаковым количеством букв можно переставить в то же слово. Проверка лишь 26 счётчиков требует одинаково мало работы независимо от длины текста.',
    ],
    [
      'need stores the recipe; have stores the current frame. Letters a–z become slots 0–25. JavaScript uses every and Java uses Arrays.equals to compare contents, not array identity.',
      'need зберігає рецепт, have — поточну рамку. Літери a–z стають комірками 0–25. JavaScript використовує every, Java — Arrays.equals: порівнюємо вміст, а не самі об’єкти масивів.',
      'need хранит рецепт, have — текущую рамку. Буквы a–z становятся ячейками 0–25. JavaScript использует every, Java — Arrays.equals: сравниваем содержимое, а не сами объекты массивов.',
    ],
  ),
  cover: detail(
    [
      'Imagine a shopping list of letter tiles: two As and one B. You may take extra tiles, but must take one continuous stretch from the shelf. Find the shortest stretch containing everything on the list.',
      'Уявіть список покупок із літер: дві A та одна B. Зайві літери брати можна, але потрібен один неперервний відрізок полиці. Шукаємо найкоротший відрізок з усім зі списку.',
      'Представьте список покупок из букв: две A и одна B. Лишние буквы брать можно, но нужен один непрерывный отрезок полки. Ищем кратчайший отрезок со всем из списка.',
    ],
    [
      [
        'Text “XAYBAZ”, list “AAB”. X supplies nothing. The first A supplies one required copy; B supplies another. We still need one A.',
        'Текст “XAYBAZ”, список “AAB”. X нічого не дає. Перша A дає одну потрібну копію, B — ще одну. Досі потрібна одна A.',
        'Текст “XAYBAZ”, список “AAB”. X ничего не даёт. Первая A даёт одну нужную копию, B — ещё одну. Всё ещё нужна одна A.',
      ],
      [
        'Add the second A. Now “XAYBA” covers the list. Save length 5, then remove X: “AYBA” still works, so save the shorter length 4.',
        'Додаємо другу A. Тепер “XAYBA” покриває список. Зберігаємо довжину 5, прибираємо X: “AYBA” досі підходить, зберігаємо коротшу довжину 4.',
        'Добавляем вторую A. Теперь “XAYBA” покрывает список. Сохраняем длину 5, убираем X: “AYBA” всё ещё подходит, сохраняем меньшую длину 4.',
      ],
      [
        'Remove the first A: now a required copy is missing, so stop shrinking. Adding the final Z does not replace it. Return “AYBA”.',
        'Прибираємо першу A: тепер бракує потрібної копії, тому припиняємо стискання. Остання Z її не замінить. Повертаємо “AYBA”.',
        'Убираем первую A: теперь не хватает нужной копии, поэтому прекращаем сжатие. Последняя Z её не заменит. Возвращаем “AYBA”.',
      ],
    ],
    [
      'Grow when something is missing; shrink while everything is covered. Save each valid candidate before removing a tile. An extra A beyond the required two does not satisfy a new requirement.',
      'Розширюємо, коли чогось бракує; стискаємо, поки все є. Зберігаємо кожного придатного кандидата до видалення літери. Зайва A понад потрібні дві не закриває нову потребу.',
      'Расширяем, когда чего-то не хватает; сжимаем, пока всё есть. Сохраняем каждого подходящего кандидата до удаления буквы. Лишняя A сверх нужных двух не закрывает новую потребность.',
    ],
    [
      'missing counts required copies still absent, not distinct letter types. need is the shopping list; have is what the window contains. bestStart and bestLength remember the winning stretch without copying it each time.',
      'missing рахує відсутні потрібні копії, а не види літер. need — список покупок, have — вміст вікна. bestStart і bestLength пам’ятають найкращий відрізок без щоразового копіювання.',
      'missing считает отсутствующие нужные копии, а не виды букв. need — список покупок, have — содержимое окна. bestStart и bestLength помнят лучший отрезок без постоянного копирования.',
    ],
  ),
}
