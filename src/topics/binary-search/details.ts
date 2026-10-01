import { detail, type LocalizedDetail } from '../shared/detailed-content'

export const details: Record<string, LocalizedDetail> = {
  exact: detail(
    [
      'Imagine numbered books arranged from smallest to largest. To find book 23, open the middle of the shelf. If it is 12, every book before it is also too small. You can ignore that whole side.',
      'Уявіть книжки з номерами, розставлені від меншого до більшого. Шукаємо книжку 23. Посередині стоїть 12: усі книжки перед нею теж замалі. Можна відкинути всю цю частину.',
      'Представьте книги с номерами, расставленные от меньшего к большему. Ищем книгу 23. Посередине стоит 12: все книги перед ней тоже слишком маленькие. Можно отбросить всю эту часть.',
    ],
    [
      [
        'Try [3, 8, 12, 17, 23]. The middle is 12. Since 23 is larger, keep only [17, 23].',
        'Візьмемо [3, 8, 12, 17, 23]. Посередині 12. Число 23 більше, тому залишаємо [17, 23].',
        'Возьмём [3, 8, 12, 17, 23]. Посередине 12. Число 23 больше, поэтому оставляем [17, 23].',
      ],
      [
        'Check 17, then keep only 23. Check that last item too: it is our answer.',
        'Перевіряємо 17, тоді залишаємо лише 23. Останній елемент теж перевіряємо: це відповідь.',
        'Проверяем 17, затем оставляем только 23. Последний элемент тоже проверяем: это ответ.',
      ],
      [
        'Return position 4. Computers count positions from 0: 3 is at 0, 8 at 1, and so on. If no positions remain, return −1 to mean “not found”.',
        'Повертаємо позицію 4. Комп’ютер рахує позиції від 0: число 3 має позицію 0, число 8 — 1. Якщо позицій не залишилося, повертаємо −1: «не знайдено».',
        'Возвращаем позицию 4. Компьютер считает позиции от 0: число 3 стоит на позиции 0, число 8 — на 1. Если позиций не осталось, возвращаем −1: «не найдено».',
      ],
    ],
    [
      'The order is the shortcut: one comparison rules out about half the remaining books. Without sorting, a discarded side could still hide the answer.',
      'Порядок дає змогу скоротити пошук: одне порівняння відкидає приблизно половину книжок. Без сортування у відкинутій частині могла б бути відповідь.',
      'Порядок сокращает поиск: одно сравнение отбрасывает примерно половину книг. Без сортировки в отброшенной части мог бы находиться ответ.',
    ],
    [
      'left and right are the first and last positions still worth checking. mid is the middle position. Moving past mid removes the item we already checked.',
      'left і right — перша та остання позиції, які ще треба перевірити. mid — середня позиція. Пересуваючись за mid, прибираємо вже перевірений елемент.',
      'left и right — первая и последняя позиции, которые ещё нужно проверить. mid — средняя позиция. Переходя за mid, убираем уже проверенный элемент.',
    ],
  ),
  boundary: detail(
    [
      'Imagine placing a new height card into cards already ordered from shortest to tallest. We want the first place where the card fits, even if that exact height is not there yet.',
      'Уявіть картки зі зростом, упорядковані від найменшого до найбільшого. Треба вставити нову картку в перше придатне місце, навіть якщо такого зросту ще немає.',
      'Представьте карточки с ростом, упорядоченные от меньшего к большему. Нужно вставить новую карточку в первое подходящее место, даже если такого роста ещё нет.',
    ],
    [
      [
        'For [2, 4, 7, 9, 12], place 6. Ask each card: “Are you at least 6?” The answers are no, no, yes, yes, yes.',
        'У [2, 4, 7, 9, 12] вставляємо 6. Питаємо: «Ти не менше 6?» Відповіді: ні, ні, так, так, так.',
        'В [2, 4, 7, 9, 12] вставляем 6. Спрашиваем: «Ты не меньше 6?» Ответы: нет, нет, да, да, да.',
      ],
      [
        'The middle card 7 says yes. Keep its position as a possible answer, but look earlier: we need the first yes.',
        'Середня картка 7 каже «так». Зберігаємо її позицію як можливу відповідь, але шукаємо раніше: нам потрібне перше «так».',
        'Средняя карточка 7 говорит «да». Сохраняем её позицию как возможный ответ, но ищем раньше: нужно первое «да».',
      ],
      [
        'The earlier card 4 says no. The boundary settles at position 2, just before 7. A card larger than everything would go at position 5, after the last card.',
        'Раніша картка 4 каже «ні». Межа зупиняється на позиції 2, перед 7. Число, більше за всі інші, потрапило б на позицію 5, після останньої картки.',
        'Предыдущая карточка 4 говорит «нет». Граница останавливается на позиции 2, перед 7. Число больше всех остальных попало бы на позицию 5, после последней карточки.',
      ],
    ],
    [
      'The answers switch from no to yes only once. Finding that switch is easier than checking every card. A yes stays a candidate; it must not be thrown away.',
      'Відповіді змінюються з «ні» на «так» лише раз. Знайти цю межу легше, ніж перевірити кожну картку. «Так» залишається кандидатом: його не можна відкидати.',
      'Ответы меняются с «нет» на «да» только один раз. Найти эту границу легче, чем проверить каждую карточку. «Да» остаётся кандидатом: его нельзя отбрасывать.',
    ],
    [
      'right starts at the number of cards, one place beyond the array. right = mid keeps a possible first match. left = mid + 1 skips a definite no.',
      'right починається з кількості карток — на одну позицію за масивом. right = mid зберігає можливий перший збіг. left = mid + 1 пропускає точне «ні».',
      'right начинается с количества карточек — на одну позицию за массивом. right = mid сохраняет возможное первое совпадение. left = mid + 1 пропускает точное «нет».',
    ],
  ),
  range: detail(
    [
      'Imagine equal-numbered cards sitting together. Finding one 4 does not tell us where the whole group begins or ends. Put one bookmark before the group and another just after it.',
      'Уявіть, що картки з однаковими числами стоять разом. Знайти одну 4 недостатньо: треба знати початок і кінець групи. Ставимо закладки перед групою та одразу після неї.',
      'Представьте, что карточки с одинаковыми числами стоят вместе. Найти одну 4 недостаточно: нужны начало и конец группы. Ставим закладки перед группой и сразу после неё.',
    ],
    [
      [
        'In [1, 4, 4, 4, 7, 9], first search for the first number at least 4. It is at position 1.',
        'У [1, 4, 4, 4, 7, 9] спочатку шукаємо перше число не менше 4. Воно на позиції 1.',
        'В [1, 4, 4, 4, 7, 9] сначала ищем первое число не меньше 4. Оно на позиции 1.',
      ],
      [
        'Next search for the first number strictly bigger than 4. That is 7 at position 4.',
        'Далі шукаємо перше число, строго більше за 4. Це 7 на позиції 4.',
        'Затем ищем первое число, строго большее 4. Это 7 на позиции 4.',
      ],
      [
        'The 4s occupy positions 1 through 3. There are 4 − 1 = 3 copies. If both bookmarks land together, the group is empty.',
        'Четвірки займають позиції від 1 до 3. Копій 4 − 1 = 3. Якщо обидві закладки збіглися, група порожня.',
        'Четвёрки занимают позиции от 1 до 3. Копий 4 − 1 = 3. Если обе закладки совпали, группа пуста.',
      ],
    ],
    [
      'Each bookmark is a first-yes search. Two searches can find even a huge group without walking through all its copies.',
      'Кожна закладка — пошук першого «так». Два пошуки знаходять навіть величезну групу без перегляду всіх її копій.',
      'Каждая закладка — поиск первого «да». Два поиска находят даже огромную группу без просмотра всех её копий.',
    ],
    [
      'strict chooses > instead of ≥. end is the position after the group, so the last matching position is end − 1. [-1, -1] means no matches.',
      'strict обирає > замість ≥. end — позиція після групи, тому останній збіг має позицію end − 1. [-1, -1] означає, що збігів немає.',
      'strict выбирает > вместо ≥. end — позиция после группы, поэтому последнее совпадение находится на end − 1. [-1, -1] означает отсутствие совпадений.',
    ],
  ),
  rotated: detail(
    [
      'Imagine an ordered row of cards, but someone moved its beginning to the end. It now looks like [8, 11, 15, 19, 1, 3, 6]. There is one break in the order, not complete chaos.',
      'Уявіть упорядкований ряд карток, у якому початок перенесли в кінець: [8, 11, 15, 19, 1, 3, 6]. Порядок порушений лише в одному місці, це не повний безлад.',
      'Представьте упорядоченный ряд карточек, в котором начало перенесли в конец: [8, 11, 15, 19, 1, 3, 6]. Порядок нарушен только в одном месте, это не полный беспорядок.',
    ],
    [
      [
        'Find 3. The middle is 19. From the left edge 8 to 19, the numbers are in order.',
        'Шукаємо 3. Посередині 19. Від лівого краю 8 до 19 числа впорядковані.',
        'Ищем 3. Посередине 19. От левого края 8 до 19 числа упорядочены.',
      ],
      [
        'Could 3 be between 8 and 19? No. Keep the other side: [1, 3, 6].',
        'Чи може 3 бути між 8 та 19? Ні. Залишаємо інший бік: [1, 3, 6].',
        'Может ли 3 быть между 8 и 19? Нет. Оставляем другую сторону: [1, 3, 6].',
      ],
      [
        'Its middle is 3, at original position 5. Return 5. In other examples, repeat the same question about whichever half is ordered.',
        'Її середина — 3, на початковій позиції 5. Повертаємо 5. В інших прикладах повторюємо перевірку для тієї половини, яка впорядкована.',
        'Её середина — 3, на исходной позиции 5. Возвращаем 5. В других примерах повторяем проверку для той половины, которая упорядочена.',
      ],
    ],
    [
      'With distinct numbers, at least one half is ordered. Its endpoints tell us whether the target can be inside. Repeated values can hide this clue, so this version does not allow them.',
      'Для різних чисел хоча б одна половина впорядкована. Її краї показують, чи може ціль бути всередині. Повтори можуть приховати цю підказку, тому ця версія їх не допускає.',
      'Для разных чисел хотя бы одна половина упорядочена. Её края показывают, может ли цель быть внутри. Повторы могут скрыть эту подсказку, поэтому эта версия их не допускает.',
    ],
    [
      'Compare a[left] with a[mid] to identify the ordered half. Then compare target with both endpoints before choosing which pointer to move.',
      'Порівняйте a[left] з a[mid], щоб визначити впорядковану половину. Потім порівняйте target з обома краями й оберіть, який вказівник пересунути.',
      'Сравните a[left] с a[mid], чтобы определить упорядоченную половину. Затем сравните target с обоими краями и выберите, какой указатель передвинуть.',
    ],
  ),
  minimum: detail(
    [
      'Think of a staircase of numbers that was cut and rearranged. We want the bottom step: the place where the numbers start over. The last number helps us choose a side.',
      'Уявіть сходинки з числами, які розрізали й переставили. Шукаємо нижню сходинку — місце, де числа починаються заново. Останнє число допомагає обрати бік.',
      'Представьте ступеньки с числами, которые разрезали и переставили. Ищем нижнюю ступеньку — место, где числа начинаются заново. Последнее число помогает выбрать сторону.',
    ],
    [
      [
        'In [8, 11, 15, 19, 1, 3, 6], compare middle 19 with last 6. Since 19 is larger, the drop to the minimum must come after 19.',
        'У [8, 11, 15, 19, 1, 3, 6] порівнюємо середнє 19 з останнім 6. Число 19 більше, отже спад до мінімуму розташований після нього.',
        'В [8, 11, 15, 19, 1, 3, 6] сравниваем среднее 19 с последним 6. Число 19 больше, значит спад к минимуму находится после него.',
      ],
      [
        'Keep [1, 3, 6]. Its middle 3 is smaller than 6, so keep 3 and everything before it: [1, 3].',
        'Залишаємо [1, 3, 6]. Середнє 3 менше за 6, тому залишаємо 3 і все перед ним: [1, 3].',
        'Оставляем [1, 3, 6]. Среднее 3 меньше 6, поэтому оставляем 3 и всё перед ним: [1, 3].',
      ],
      [
        'Compare 1 with 3. Keep 1. One value remains, so return 1.',
        'Порівнюємо 1 з 3. Залишаємо 1. Лишилося одне значення — повертаємо 1.',
        'Сравниваем 1 с 3. Оставляем 1. Осталось одно значение — возвращаем 1.',
      ],
    ],
    [
      'The minimum never leaves the remaining part. When the middle is on the low side, it might itself be the minimum, so keep it. This needs distinct values and at least one item.',
      'Мінімум завжди залишається у вибраній частині. Якщо середина на нижньому боці, вона сама може бути мінімумом, тому зберігаємо її. Потрібні різні значення й хоча б один елемент.',
      'Минимум всегда остаётся в выбранной части. Если середина на нижней стороне, она сама может быть минимумом, поэтому сохраняем её. Нужны разные значения и хотя бы один элемент.',
    ],
    [
      'right = mid keeps the middle candidate. left = mid + 1 removes the high side. Return a[left], the value, rather than its position.',
      'right = mid зберігає середнього кандидата. left = mid + 1 прибирає високий бік. Повертаємо a[left] — значення, а не його позицію.',
      'right = mid сохраняет среднего кандидата. left = mid + 1 убирает высокую сторону. Возвращаем a[left] — значение, а не его позицию.',
    ],
  ),
  answer: detail(
    [
      'Imagine eating bananas from separate bowls. You choose a speed: bananas per hour. Each hour you work on only one bowl; even its last few bananas use a whole hour. Find the slowest speed that meets the deadline.',
      'Уявіть банани в окремих мисках. Обираємо швидкість: бананів за годину. За годину працюємо лише з однією мискою; навіть її останні кілька бананів займають цілу годину. Шукаємо найменшу швидкість, щоб устигнути.',
      'Представьте бананы в отдельных мисках. Выбираем скорость: бананов в час. За час работаем только с одной миской; даже её последние несколько бананов занимают целый час. Ищем наименьшую скорость, чтобы успеть.',
    ],
    [
      [
        'Bowls [4, 6], deadline 3 hours. At speed 3, the first bowl needs 2 hours and the second needs 2: too slow.',
        'Миски [4, 6], маємо 3 години. За швидкості 3 перша миска потребує 2 години, друга теж 2: запізнюємося.',
        'Миски [4, 6], есть 3 часа. При скорости 3 первая миска требует 2 часа, вторая тоже 2: опаздываем.',
      ],
      [
        'At speed 4, the bowls need 1 and 2 hours: exactly 3. Speed 4 works; every faster speed also works.',
        'За швидкості 4 потрібно 1 та 2 години: разом 3. Швидкість 4 підходить; будь-яка більша теж підійде.',
        'При скорости 4 нужны 1 и 2 часа: всего 3. Скорость 4 подходит; любая большая тоже подойдёт.',
      ],
      [
        'Search speeds 1 through 6 by checking the middle. A failed speed removes all slower speeds. A working speed stays a candidate while we try slower ones.',
        'Шукаємо серед швидкостей від 1 до 6, перевіряючи середину. Невдала швидкість відкидає всі менші. Вдалу зберігаємо й пробуємо повільніші.',
        'Ищем среди скоростей от 1 до 6, проверяя середину. Неудачная скорость отбрасывает все меньшие. Удачную сохраняем и пробуем более медленные.',
      ],
    ],
    [
      'We are searching possible answers, not bowl positions. The key promise is that going faster cannot make us finish later. Without that promise, throwing away half the speeds would be unsafe.',
      'Шукаємо можливі відповіді, а не позиції мисок. Головне: більша швидкість не може змусити нас закінчити пізніше. Без цієї умови не можна відкидати половину швидкостей.',
      'Ищем возможные ответы, а не позиции мисок. Главное: большая скорость не может заставить нас закончить позже. Без этого условия нельзя отбрасывать половину скоростей.',
    ],
    [
      'mid is a trial speed. needed adds the hours for each bowl, rounding each division up. The deadline must allow at least one hour per bowl.',
      'mid — пробна швидкість. needed додає години для кожної миски, округлюючи кожне ділення вгору. Треба мати хоча б одну годину на кожну миску.',
      'mid — пробная скорость. needed складывает часы для каждой миски, округляя каждое деление вверх. Нужно иметь хотя бы один час на каждую миску.',
    ],
  ),
  peak: detail(
    [
      'Imagine a row of hills. A peak is a spot higher than the spots immediately beside it. We only need one such spot, not the tallest hill in the entire landscape.',
      'Уявіть ряд пагорбів. Вершина — місце, вище за безпосередніх сусідів. Потрібна будь-яка така вершина, а не найвищий пагорб у всьому краєвиді.',
      'Представьте ряд холмов. Вершина — место выше непосредственных соседей. Нужна любая такая вершина, а не самый высокий холм во всём пейзаже.',
    ],
    [
      [
        'For [2, 6, 3, 5, 9, 4], compare middle 3 with its next neighbor 5. The path goes up to the right.',
        'У [2, 6, 3, 5, 9, 4] порівнюємо середнє 3 з наступним сусідом 5. Праворуч шлях підіймається.',
        'В [2, 6, 3, 5, 9, 4] сравниваем среднее 3 со следующим соседом 5. Справа путь поднимается.',
      ],
      [
        'Keep [5, 9, 4]. Now 9 is higher than its next neighbor 4, so keep 9 and the left side.',
        'Залишаємо [5, 9, 4]. Тепер 9 вище за наступного сусіда 4, тому залишаємо 9 та лівий бік.',
        'Оставляем [5, 9, 4]. Теперь 9 выше следующего соседа 4, поэтому оставляем 9 и левую сторону.',
      ],
      [
        'Compare 5 with 9: go right. Position 4, with value 9, remains. Value 6 was also a peak, but either answer is allowed.',
        'Порівнюємо 5 з 9: ідемо праворуч. Залишається позиція 4 зі значенням 9. Значення 6 теж було вершиною, але підходить будь-яка.',
        'Сравниваем 5 с 9: идём вправо. Остаётся позиция 4 со значением 9. Значение 6 тоже было вершиной, но подходит любая.',
      ],
    ],
    [
      'Following the higher side must eventually reach a peak: the numbers either turn downward or reach an edge. Treat outside neighbors as lower than everything. Equal adjacent heights are excluded here.',
      'Рух до вищого боку зрештою приведе до вершини: числа або почнуть спадати, або дійдуть до краю. Уявляємо зовнішніх сусідів нижчими за все. Однакові сусідні висоти тут не допускаються.',
      'Движение к более высокой стороне в итоге приведёт к вершине: числа либо начнут снижаться, либо дойдут до края. Считаем внешних соседей ниже всего. Одинаковые соседние высоты здесь не допускаются.',
    ],
    [
      'Compare a[mid] with a[mid + 1]. left < right ensures that next neighbor exists. Return the remaining position, not the height.',
      'Порівнюємо a[mid] з a[mid + 1]. Умова left < right гарантує наявність наступного сусіда. Повертаємо позицію, що залишилася, а не висоту.',
      'Сравниваем a[mid] с a[mid + 1]. Условие left < right гарантирует наличие следующего соседа. Возвращаем оставшуюся позицию, а не высоту.',
    ],
  ),
}
