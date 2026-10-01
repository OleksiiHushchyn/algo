import { detail, type LocalizedDetail } from '../shared/detailed-content'

export const details: Record<string, LocalizedDetail> = {
  pair: detail(
    [
      'Imagine price tags in increasing order. You want two different items costing 10 together. Put one finger on the cheapest tag and another on the most expensive. Move the finger that can improve the total.',
      'Уявіть цінники за зростанням. Потрібні два різні товари загальною вартістю 10. Один палець на найдешевшому, інший на найдорожчому. Рухаємо той, який може покращити суму.',
      'Представьте ценники по возрастанию. Нужны два разных товара общей стоимостью 10. Один палец на самом дешёвом, другой на самом дорогом. Двигаем тот, который может улучшить сумму.',
    ],
    [
      [
        'Try [1, 3, 4, 6, 8, 11]. First total: 1 + 11 = 12. Too large, so move the right finger from 11 to 8.',
        'Візьмемо [1, 3, 4, 6, 8, 11]. Спочатку 1 + 11 = 12. Забагато: правий палець рухається з 11 на 8.',
        'Возьмём [1, 3, 4, 6, 8, 11]. Сначала 1 + 11 = 12. Много: правый палец движется с 11 на 8.',
      ],
      [
        'Now 1 + 8 = 9. Too small: move the left finger to 3. Then 3 + 8 = 11, so move the right finger to 6.',
        'Тепер 1 + 8 = 9. Замало: лівий палець рухається на 3. Далі 3 + 8 = 11, тому правий рухається на 6.',
        'Теперь 1 + 8 = 9. Мало: левый палец движется на 3. Затем 3 + 8 = 11, поэтому правый движется на 6.',
      ],
      [
        '3 + 6 = 9, so move left again. 4 + 6 = 10: return positions [2, 3]. Stop before the fingers meet; one item cannot be used twice.',
        '3 + 6 = 9, знову рухаємо лівий. 4 + 6 = 10: повертаємо позиції [2, 3]. Зупиняємося до зустрічі пальців: один товар не можна взяти двічі.',
        '3 + 6 = 9, снова двигаем левый. 4 + 6 = 10: возвращаем позиции [2, 3]. Останавливаемся до встречи пальцев: один товар нельзя взять дважды.',
      ],
    ],
    [
      'If even the smallest partner makes a right-hand value too expensive, no other partner can rescue it. The opposite argument removes a left-hand value when its best possible total is too small. Sorting makes this safe.',
      'Якщо навіть найменший партнер робить праве значення завеликим, інший його не врятує. Так само відкидаємо ліве, якщо навіть найбільша можлива сума замала. Це працює завдяки сортуванню.',
      'Если даже наименьший партнёр делает правое значение слишком большим, другой его не спасёт. Так же отбрасываем левое, если даже наибольшая возможная сумма мала. Это работает благодаря сортировке.',
    ],
    [
      'left and right are positions, not values. a[left] reads the price at a position. Return zero-based positions here; add 1 for LeetCode 167.',
      'left і right — позиції, а не значення. a[left] читає ціну на позиції. Тут повертаємо позиції від нуля; для LeetCode 167 додайте 1.',
      'left и right — позиции, а не значения. a[left] читает цену на позиции. Здесь возвращаем позиции от нуля; для LeetCode 167 прибавьте 1.',
    ],
  ),
  palindrome: detail(
    [
      'Imagine folding a word in half. Matching letters should land on each other. We compare from the outside inward, ignoring punctuation and whether letters are uppercase or lowercase.',
      'Уявіть, що складаєте слово навпіл. Однакові літери мають накластися одна на одну. Порівнюємо від країв до середини, не зважаючи на пунктуацію та великі чи малі літери.',
      'Представьте, что складываете слово пополам. Одинаковые буквы должны наложиться друг на друга. Сравниваем от краёв к середине, не обращая внимания на пунктуацию и регистр.',
    ],
    [
      [
        'In “Level!”, the right finger first sees !. It is not a letter or digit, so skip it.',
        'У “Level!” правий палець спочатку бачить !. Це не літера й не цифра, тому пропускаємо.',
        'В “Level!” правый палец сначала видит !. Это не буква и не цифра, поэтому пропускаем.',
      ],
      [
        'Compare L and l as lowercase letters: they match. Move both fingers inward and compare e with e.',
        'Порівнюємо L і l як малі літери: збігаються. Рухаємо обидва пальці всередину й порівнюємо e з e.',
        'Сравниваем L и l как маленькие буквы: совпадают. Двигаем оба пальца внутрь и сравниваем e с e.',
      ],
      [
        'Only v remains in the middle, so return true. A mismatch such as a versus b would let us return false immediately.',
        'Посередині залишилася лише v: повертаємо true. Незбіг, наприклад a та b, дозволив би відразу повернути false.',
        'Посередине осталась только v: возвращаем true. Несовпадение, например a и b, позволило бы сразу вернуть false.',
      ],
    ],
    [
      'Every outside pair must agree for the whole word to read the same backward. Once a pair agrees, it never needs checking again. An empty word has no mismatching pair, so it passes too.',
      'Щоб слово читалося однаково назад, усі пари мають збігатися. Перевірену пару більше не чіпаємо. У порожнього слова немає незбіжних пар, тому воно теж підходить.',
      'Чтобы слово читалось одинаково назад, все пары должны совпадать. Проверенную пару больше не трогаем. У пустого слова нет несовпадающих пар, поэтому оно тоже подходит.',
    ],
    [
      'The inner while loops skip unwanted characters. The outer while moves through useful pairs. This example recognizes ASCII letters a–z, A–Z, and digits 0–9.',
      'Внутрішні while пропускають зайві символи. Зовнішній while перебирає корисні пари. Цей приклад розпізнає ASCII-літери a–z, A–Z і цифри 0–9.',
      'Внутренние while пропускают лишние символы. Внешний while перебирает полезные пары. Этот пример распознаёт ASCII-буквы a–z, A–Z и цифры 0–9.',
    ],
  ),
  'read-write': detail(
    [
      'Imagine tidying a row of sorted cards without getting a second table. One finger reads cards. Another points to the next place where a card worth keeping should be written.',
      'Уявіть прибирання впорядкованого ряду карток без другого столу. Один палець читає картки, інший показує наступне місце для картки, яку треба зберегти.',
      'Представьте уборку упорядоченного ряда карточек без второго стола. Один палец читает карточки, другой показывает следующее место для карточки, которую нужно сохранить.',
    ],
    [
      [
        'Start with [2, 2, 5, 5, 8]. Keep the first 2 in slot 0. The next 2 matches the last kept card, so skip it.',
        'Починаємо з [2, 2, 5, 5, 8]. Зберігаємо першу 2 у комірці 0. Наступна 2 така сама, тому пропускаємо.',
        'Начинаем с [2, 2, 5, 5, 8]. Сохраняем первую 2 в ячейке 0. Следующая 2 такая же, поэтому пропускаем.',
      ],
      [
        'Read 5 and copy it into slot 1. Skip the second 5. Read 8 and copy it into slot 2.',
        'Читаємо 5 й копіюємо в комірку 1. Другу 5 пропускаємо. Читаємо 8 й копіюємо в комірку 2.',
        'Читаем 5 и копируем в ячейку 1. Вторую 5 пропускаем. Читаем 8 и копируем в ячейку 2.',
      ],
      [
        'Return 3: only the first three slots, [2, 5, 8], matter now. The remaining slots still exist, but their old contents are ignored.',
        'Повертаємо 3: тепер важливі лише перші три комірки [2, 5, 8]. Решта комірок існують, але їхній старий вміст ігноруємо.',
        'Возвращаем 3: теперь важны только первые три ячейки [2, 5, 8]. Остальные ячейки существуют, но их старое содержимое игнорируем.',
      ],
    ],
    [
      'Sorting puts duplicates next to each other. Comparing with the last kept card is enough. The writing finger never passes the reading finger, so it cannot destroy a card we have not read.',
      'Сортування ставить повтори поруч. Достатньо порівнювати з останньою збереженою карткою. Палець запису не випереджає палець читання, тому не знищить непрочитану картку.',
      'Сортировка ставит повторы рядом. Достаточно сравнивать с последней сохранённой карточкой. Палец записи не обгоняет палец чтения, поэтому не уничтожит непрочитанную карточку.',
    ],
    [
      'read visits every position. write counts kept items and also marks the next free slot. write == 0 handles the first keeper, when there is no previous one.',
      'read відвідує кожну позицію. write рахує збережені елементи й указує наступну вільну комірку. write == 0 обробляє перший елемент, коли попереднього ще немає.',
      'read посещает каждую позицию. write считает сохранённые элементы и указывает следующую свободную ячейку. write == 0 обрабатывает первый элемент, когда предыдущего ещё нет.',
    ],
  ),
  subsequence: detail(
    [
      'Imagine following a shopping list while walking along shelves once. You may walk past things you do not need, but you cannot go backward. Can you collect the wanted letters in their listed order?',
      'Уявіть список покупок і один прохід уздовж полиць. Можна пропускати зайве, але не повертатися назад. Чи зберете потрібні літери в порядку зі списку?',
      'Представьте список покупок и один проход вдоль полок. Можно пропускать лишнее, но нельзя возвращаться назад. Соберёте ли нужные буквы в порядке из списка?',
    ],
    [
      [
        'Wanted word: “cat”. Available text: “coat”. Match c with c, so the next wanted letter is a.',
        'Потрібне слово: “cat”. Маємо текст “coat”. c збігається з c, тому наступна потрібна літера — a.',
        'Нужное слово: “cat”. Есть текст “coat”. c совпадает с c, поэтому следующая нужная буква — a.',
      ],
      [
        'The next available letter is o. Skip it, but keep wanting a. Then a matches; start wanting t.',
        'Наступна доступна літера — o. Пропускаємо її, але досі шукаємо a. Потім a збігається; починаємо шукати t.',
        'Следующая доступная буква — o. Пропускаем её, но всё ещё ищем a. Затем a совпадает; начинаем искать t.',
      ],
      [
        'Match t. All three wanted letters are collected: true. “tac” would fail because finding t at the end leaves no later a or c.',
        'Знаходимо t. Усі три потрібні літери зібрано: true. “tac” не підійде: після t наприкінці вже немає a чи c.',
        'Находим t. Все три нужные буквы собраны: true. “tac” не подойдёт: после t в конце уже нет a или c.',
      ],
    ],
    [
      'Taking the earliest possible match leaves the most room for later letters. Skipping a mismatch does not lose a match for the letter we currently need.',
      'Найраніший можливий збіг залишає найбільше місця для наступних літер. Пропуск незбігу не втрачає потрібну зараз літеру.',
      'Самое раннее возможное совпадение оставляет больше всего места для следующих букв. Пропуск несовпадения не теряет нужную сейчас букву.',
    ],
    [
      'wanted counts matched letters in s. scan moves through t on every turn. Success is wanted == length(s), even when s is empty from the beginning.',
      'wanted рахує знайдені літери s. scan кожного разу рухається по t. Успіх — wanted == length(s), навіть якщо s від початку порожнє.',
      'wanted считает найденные буквы s. scan каждый раз движется по t. Успех — wanted == length(s), даже если s изначально пустое.',
    ],
  ),
  merge: detail(
    [
      'Imagine combining two sorted rows of cards. The first row has empty spaces at its end. Fill those spaces from the back so you do not cover cards you still need to read.',
      'Уявіть об’єднання двох упорядкованих рядів карток. Перший має порожні місця наприкінці. Заповнюємо з кінця, щоб не закрити ще непрочитані картки.',
      'Представьте объединение двух упорядоченных рядов карточек. У первого есть пустые места в конце. Заполняем с конца, чтобы не закрыть ещё непрочитанные карточки.',
    ],
    [
      [
        'A has [1, 5, 9, spare, spare, spare], B has [2, 6, 8]. Compare the last real cards: 9 and 8. Write 9 into A’s last slot.',
        'A має [1, 5, 9, вільно, вільно, вільно], B — [2, 6, 8]. Порівнюємо останні справжні картки: 9 та 8. Записуємо 9 в останню комірку A.',
        'A содержит [1, 5, 9, свободно, свободно, свободно], B — [2, 6, 8]. Сравниваем последние настоящие карточки: 9 и 8. Записываем 9 в последнюю ячейку A.',
      ],
      [
        'Now compare 5 and 8: write 8 just before 9. Next write 6, then 5, then 2.',
        'Тепер порівнюємо 5 та 8: записуємо 8 перед 9. Далі записуємо 6, потім 5, потім 2.',
        'Теперь сравниваем 5 и 8: записываем 8 перед 9. Затем записываем 6, потом 5, потом 2.',
      ],
      [
        'B is empty. The remaining 1 in A is already in the right place. Result: [1, 2, 5, 6, 8, 9].',
        'B закінчився. Число 1, що залишилося в A, уже на своєму місці. Результат: [1, 2, 5, 6, 8, 9].',
        'B закончился. Оставшееся в A число 1 уже на своём месте. Результат: [1, 2, 5, 6, 8, 9].',
      ],
    ],
    [
      'The biggest unused card belongs in the last unfilled slot. Writing backward keeps unread A cards safe. Writing forward could overwrite them.',
      'Найбільша невикористана картка належить останній незаповненій комірці. Запис із кінця зберігає непрочитані картки A. Запис із початку міг би їх затерти.',
      'Самая большая неиспользованная карточка принадлежит последней незаполненной ячейке. Запись с конца сохраняет непрочитанные карточки A. Запись с начала могла бы их затереть.',
    ],
    [
      'i and j point to the last unused cards; write points to the output slot. m counts real items in A, not its spare capacity. The function changes A directly.',
      'i та j указують останні невикористані картки; write — комірку результату. m рахує справжні елементи A, без запасних місць. Функція змінює A безпосередньо.',
      'i и j указывают последние неиспользованные карточки; write — ячейку результата. m считает настоящие элементы A без запасных мест. Функция изменяет A напрямую.',
    ],
  ),
  triplets: detail(
    [
      'Finding three cards at once is tricky. Hold one card still. Now the remaining job is familiar: find two other cards whose sum cancels the card you are holding.',
      'Шукати три картки одразу складно. Зафіксуйте одну. Решта задачі вже знайома: знайти дві інші, сума яких компенсує зафіксовану картку.',
      'Искать три карточки сразу сложно. Зафиксируйте одну. Оставшаяся задача уже знакома: найти две другие, сумма которых компенсирует зафиксированную карточку.',
    ],
    [
      [
        'Sort [-1, 0, 1, 2, -1, -4] into [-4, -1, -1, 0, 1, 2]. Hold −4: no pair after it adds to 4.',
        'Сортуємо [-1, 0, 1, 2, -1, -4] у [-4, -1, -1, 0, 1, 2]. Фіксуємо −4: жодна пара після нього не дає 4.',
        'Сортируем [-1, 0, 1, 2, -1, -4] в [-4, -1, -1, 0, 1, 2]. Фиксируем −4: ни одна пара после него не даёт 4.',
      ],
      [
        'Hold the first −1. The pair must total 1. Opposite-end fingers find −1 + 2, giving [-1, -1, 2].',
        'Фіксуємо першу −1. Пара має давати 1. Вказівники з країв знаходять −1 + 2, отримуємо [-1, -1, 2].',
        'Фиксируем первую −1. Пара должна давать 1. Указатели с краёв находят −1 + 2, получаем [-1, -1, 2].',
      ],
      [
        'Move both fingers inward: 0 + 1 also works, giving [-1, 0, 1]. Skip the next fixed −1 so we do not report the same groups again.',
        'Рухаємо обидва вказівники всередину: 0 + 1 теж підходить, отримуємо [-1, 0, 1]. Наступну зафіксовану −1 пропускаємо, щоб не повторити ті самі групи.',
        'Двигаем оба указателя внутрь: 0 + 1 тоже подходит, получаем [-1, 0, 1]. Следующую фиксированную −1 пропускаем, чтобы не повторить те же группы.',
      ],
    ],
    [
      'Each fixed card gets a sorted pair search after it, so no position is reused. Skipping equal values removes duplicate answers, not different combinations of values.',
      'Для кожної зафіксованої картки шукаємо пару після неї, тому позиції не повторюються. Пропускаючи однакові значення, прибираємо дублікати відповідей, а не різні набори значень.',
      'Для каждой фиксированной карточки ищем пару после неё, поэтому позиции не повторяются. Пропуская одинаковые значения, убираем дубликаты ответов, а не разные наборы значений.',
    ],
    [
      'fixed chooses the first card. left and right find the other two. result stores groups of values, not positions. Sorting changes the input order.',
      'fixed обирає першу картку. left і right шукають дві інші. result зберігає групи значень, а не позицій. Сортування змінює порядок входу.',
      'fixed выбирает первую карточку. left и right ищут две другие. result хранит группы значений, а не позиций. Сортировка меняет порядок входа.',
    ],
  ),
  container: detail(
    [
      'Imagine two walls holding water between them. Water spills over the shorter wall, so the taller wall alone cannot help. Capacity depends on both the distance between them and the shorter height.',
      'Уявіть дві стінки, що тримають воду. Вода переливається через нижчу, тому сама лише висока не допоможе. Місткість залежить від відстані між ними та нижчої висоти.',
      'Представьте две стенки, удерживающие воду. Вода переливается через низкую, поэтому сама по себе высокая не поможет. Вместимость зависит от расстояния между ними и меньшей высоты.',
    ],
    [
      [
        'Take heights [1, 8, 6, 2, 5, 4, 8, 3, 7]. The outside walls have width 8 and shorter height 1: area 8.',
        'Висоти [1, 8, 6, 2, 5, 4, 8, 3, 7]. Крайні стінки мають ширину 8 і меншу висоту 1: площа 8.',
        'Высоты [1, 8, 6, 2, 5, 4, 8, 3, 7]. Крайние стенки имеют ширину 8 и меньшую высоту 1: площадь 8.',
      ],
      [
        'Move the short left wall inward. Heights 8 and 7 now have width 7: area 7 × 7 = 49. Remember this best result.',
        'Рухаємо низьку ліву стінку всередину. Висоти 8 та 7 тепер мають ширину 7: площа 7 × 7 = 49. Запам’ятовуємо цей найкращий результат.',
        'Двигаем низкую левую стенку внутрь. Высоты 8 и 7 теперь имеют ширину 7: площадь 7 × 7 = 49. Запоминаем этот лучший результат.',
      ],
      [
        'Keep moving the shorter side and checking. Some later areas are smaller; keep the best seen, not just the last area. The final answer here is 49.',
        'Далі рухаємо нижчий бік і перевіряємо. Деякі площі менші: зберігаємо найкращу, а не останню. Відповідь тут — 49.',
        'Дальше двигаем более низкую сторону и проверяем. Некоторые площади меньше: сохраняем лучшую, а не последнюю. Ответ здесь — 49.',
      ],
    ],
    [
      'Keeping the short wall while moving the tall one only reduces width; the water still cannot rise above the short wall. So the short wall must change to have a chance of improving.',
      'Якщо лишити низьку стінку й пересунути високу, ширина лише зменшиться, а вода не підніметься вище низької. Щоб покращити результат, треба змінити саме низьку.',
      'Если оставить низкую стенку и передвинуть высокую, ширина только уменьшится, а вода не поднимется выше низкой. Для улучшения нужно менять именно низкую.',
    ],
    [
      'right − left gives width. min chooses the shorter height. best remembers the largest area. Do not sort: moving walls changes the distances.',
      'right − left дає ширину. min обирає меншу висоту. best пам’ятає найбільшу площу. Не сортуйте: перестановка стінок змінює відстані.',
      'right − left даёт ширину. min выбирает меньшую высоту. best помнит наибольшую площадь. Не сортируйте: перестановка стенок меняет расстояния.',
    ],
  ),
  'fast-slow': detail(
    [
      'Imagine stepping-stones with arrows to the next stone. An arrow might lead back to an earlier stone, making a loop. Two walkers start together: one follows one arrow per turn, the other follows two.',
      'Уявіть камінці зі стрілками до наступного. Стрілка може вести до попереднього камінця й утворити коло. Двоє починають разом: один іде за однією стрілкою за хід, інший — за двома.',
      'Представьте камни со стрелками к следующему. Стрелка может вести к предыдущему камню и образовать круг. Двое начинают вместе: один проходит одну стрелку за ход, другой — две.',
    ],
    [
      [
        'Use A → B → C → D → B. After one turn, slow is at B and fast is at C.',
        'Маємо A → B → C → D → B. Після одного ходу slow на B, fast на C.',
        'Имеем A → B → C → D → B. После одного хода slow на B, fast на C.',
      ],
      [
        'After two turns, slow is at C and fast is at B. After three, both are at D: there is a loop.',
        'Після двох ходів slow на C, fast на B. Після трьох обидва на D: є цикл.',
        'После двух ходов slow на C, fast на B. После трёх оба на D: есть цикл.',
      ],
      [
        'On a chain A → B → C → end, fast instead reaches the end. Return false. Do not count their shared starting point as a meeting; move first.',
        'У ланцюжку A → B → C → кінець fast дійде до кінця. Повертаємо false. Спільний старт не рахуємо зустріччю: спершу робимо хід.',
        'В цепочке A → B → C → конец fast дойдёт до конца. Возвращаем false. Общий старт не считаем встречей: сначала делаем ход.',
      ],
    ],
    [
      'Once both walkers are in a loop, fast gains one stone each turn and eventually catches slow. Without a loop, the faster walker runs out of arrows.',
      'Коли обидва в колі, fast наздоганяє на один камінець за хід і зрештою зустрічає slow. Без кола у швидкого закінчаться стрілки.',
      'Когда оба в круге, fast догоняет на один камень за ход и в итоге встречает slow. Без круга у быстрого закончатся стрелки.',
    ],
    [
      'A node is a stone; next is its arrow; null means no next stone. Compare the actual nodes, not their labels: two different stones may carry the same number.',
      'Вузол — камінець; next — стрілка; null означає, що наступного немає. Порівнюйте самі вузли, а не підписи: два різні камінці можуть мати однакове число.',
      'Узел — камень; next — стрелка; null означает, что следующего нет. Сравнивайте сами узлы, а не подписи: два разных камня могут иметь одинаковое число.',
    ],
  ),
}
