// Javascript code

function Book(title, author, price, description, image) {
    this.title = title
    this.author = author
    this.price = price
    this.description = description
    this.image = image
}
var db
books = []
cartList = []
window.onload = function() {

    db = openDatabase('cartdb', '1.0', 'Cart Items', '2*1024*1024')
    db.transaction(function(tx) {
        // tx.executeSql('drop table cart')
        tx.executeSql('create table if not exists cart(name varchar(100),price int,quantity int,amount int)')
            //tx.executeSql('delete from cart where 1=1')
    })
    if (document.title === 'Online Bookstore - Index') {
        loadData()
    } else if (document.title === 'Online bookstore - Cart') {
        loadCartData()
    } else {
        checkout()
    }
}

function loadData() {

    if (window.localStorage.getItem('books') == null) {
        books.push(new Book('The Alchemist', 'Paulo Coelho', '150', "Paulo Coelho's enchanting novel has inspired a devoted following around the world. This story, dazzling in its powerful simplicity and soul-stirring wisdom, is about an Andalusian shepherd boy named Santiago who travels from his homeland in Spain to the Egyptian desert in search of a treasure buried near the Pyramids. Along the way he meets a Gypsy woman, a man who calls himself king, and an alchemist, all of whom point Santiago in the direction of his quest. No one knows what the treasure is, or if Santiago will be able to surmount the obstacles in his path. But what starts out as a journey to find worldly goods turns into a discovery of the treasure found within. Lush, evocative, and deeply humane, the story of Santiago is an eternal testament to the transforming power of our dreams and the importance of listening to our hearts.", 'alchemist.jpg'))
        books.push(new Book('1984', 'George Orwell', '180', "Among the seminal texts of the 20th century, Nineteen Eighty-Four is a rare work that grows more haunting as its futuristic purgatory becomes more real. Published in 1949, the book offers political satirist George Orwell's nightmarish vision of a totalitarian, bureaucratic world and one poor stiff's attempt to find individuality. The brilliance of the novel is Orwell's prescience of modern life—the ubiquity of television, the distortion of the language—and his ability to construct such a thorough version of hell. Required reading for students since it was published, it ranks among the most terrifying novels ever written.", '1984.jpg'))
        books.push(new Book('The Great Gatsby', 'F. Scott Fitzgerald', '200', "The Great Gatsby, F. Scott Fitzgerald's third book, stands as the supreme achievement of his career. This exemplary novel of the Jazz Age has been acclaimed by generations of readers. The story is of the fabulously wealthy Jay Gatsby and his new love for the beautiful Daisy Buchanan, of lavish parties on Long Island at a time when The New York Times noted 'gin was the national drink and sex the national obsession', it is an exquisitely crafted tale of America in the 1920s. \nThe Great Gatsby is one of the great classics of twentieth-century literature.", 'gatsby.jpg'))
        books.push(new Book('The Old Man and the Sea', 'Ernest Hemingway', '200', "The last novel Ernest Hemingway saw published, The Old Man and the Sea has proved itself to be one of the enduring works of American fiction. It is the story of an old Cuban fisherman and his supreme ordeal: a relentless, agonizing battle with a giant marlin far out in the Gulf Stream. Using the simple, powerful language of a fable, Hemingway takes the timeless themes of courage in the face of defeat and personal triumph won from loss and transforms them into a magnificent twentieth-century classic.", "oldman.jpg"))
        books.push(new Book('The Hobbit There and Back Again', 'J.R.R. Tolkien', '300', "In a hole in the ground there lived a hobbit. Not a nasty, dirty, wet hole, filled with the ends of worms and an oozy smell, nor yet a dry, bare, sandy hole with nothing in it to sit down on or to eat: it was a hobbit-hole, and that means comfort. \nWritten for J.R.R. Tolkien’s own children, The Hobbit met with instant critical acclaim when it was first published in 1937. Now recognized as a timeless classic, this introduction to the hobbit Bilbo Baggins, the wizard Gandalf, Gollum, and the spectacular world of Middle-earth recounts of the adventures of a reluctant hero, a powerful and dangerous ring, and the cruel dragon Smaug the Magnificent. The text in this 372-page paperback edition is based on that first published in Great Britain by Collins Modern Classics (1998), and includes a note on the text by Douglas A. Anderson (2001). Unforgettable!", 'hobbit.jpg'))
        books.push(new Book('The Metamorphosis', 'Franz Kafka', '350', "As Gregor Samsa awoke one morning from uneasy dreams he found himself transformed in his bed into a gigantic insect. He was laying on his hard, as it were armor-plated, back and when he lifted his head a little he could see his domelike brown belly divided into stiff arched segments on top of which the bed quilt could hardly keep in position and was about to slide off completely. His numerous legs, which were pitifully thin compared to the rest of his bulk, waved helplessly before his eyes.\" With it's startling, bizarre, yet surprisingly funny first opening, Kafka begins his masterpiece, The Metamorphosis. It is the story of a young man who, transformed overnight into a giant beetle-like insect, becomes an object of disgrace to his family, an outsider in his own home, a quintessentially alienated man. A harrowing—though absurdly comic—meditation on human feelings of inadequacy, guilt, and isolation, The Metamorphosishas taken its place as one of the most widely read and influential works of twentieth-century fiction. As W.H. Auden wrote, \"Kafka is important to us because his predicament is the predicament of modern man.\" ", 'meta.jpg'))
        books.push(new Book('Murder on the Orient Express', 'Agatha Christie', '250', "Le train est aussi dangereux que le paquebot » affirme Hercule Poirot… \nLe lendemain, dans une voiture de l’Orient-Express bloqué par les neiges yougoslaves, on découvre le cadavre d’un américain lardé de douze coups de couteau. L’assassin n’a pu venir de l’extérieur : voici donc un huis clos, le plus fameux, peut-être, de toute la littérature policière. Pour mener son enquête, le petit détective belge a le choix entre une princesse russe, une Américaine fantasque, le secrétaire de la victime, un couple de Hongrois distingués, l’inévitable colonel de retour des Indes, les domestiques de tout ce beau monde et le contrôleur du train.", 'orient.jpg'))
        books.push(new Book('The Little Prince', 'Antoine de Saint-Exupéry', '220', "Moral allegory and spiritual autobiography, The Little Prince is the most translated book in the French language. With a timeless charm it tells the story of a little boy who leaves the safety of his own tiny planet to travel the universe, learning the vagaries of adult behaviour through a series of extraordinary encounters. His personal odyssey culminates in a voyage to Earth and further adventures.", 'price.jpg'))
        books.push(new Book('Do Androids Dream of Electric Sheep?', 'Philip K. Dick', '450', "It was January 2021, and Rick Deckard had a license to kill. \nSomewhere among the hordes of humans out there, lurked several rogue androids. Deckard's assignment--find them and then...\"retire\" them. Trouble was, the androids all looked exactly like humans, and they didn't want to be found!", 'blade.jpg'))
        books.push(new Book('The Time Machine', 'H.G. Wells', '450', " “I’ve had a most amazing time....” \nSo begins the Time Traveller’s astonishing firsthand account of his journey 800,000 years beyond his own era—and the story that launched H.G. Wells’s successful career and earned him his reputation as the father of science fiction. With a speculative leap that still fires the imagination, Wells sends his brave explorer to face a future burdened with our greatest hopes...and our darkest fears. A pull of the Time Machine’s lever propels him to the age of a slowly dying Earth.  There he discovers two bizarre races—the ethereal Eloi and the subterranean Morlocks—who not only symbolize the duality of human nature, but offer a terrifying portrait of the men of tomorrow as well.  Published in 1895, this masterpiece of invention captivated readers on the threshold of a new century. Thanks to Wells’s expert storytelling and provocative insight, The Time Machinewill continue to enthrall readers for generations to come.", 'time.jpg'))

        window.localStorage.setItem('books', JSON.stringify(books))
    } else {
        var book = JSON.parse(localStorage.getItem('books'));
        book.forEach(function(item) {
            books.push(item);
        })
    }

    if (window.localStorage.getItem('cart') != null) {
        var cart = JSON.parse(localStorage.getItem('cart'))
        cart.forEach(function(item) {
            cartList.push(item)
        })
    }

    cartCount()

    var container = document.getElementById('container')
    var descContainer = document.getElementById('description')
    books.forEach(function(book, index) {
        var div = document.createElement('div')
        div.className = 'card'
        var description = document.createElement('div')
        description.className = 'description'
        var p = document.createElement('p').appendChild(document.createTextNode(book.description))
        description.appendChild(p)
        descContainer.appendChild(description)

        var imga = document.createElement('a')
        var image = document.createElement('img')
        image.setAttribute('src', 'images/' + book.image)
        image.setAttribute('height', '250')
        image.setAttribute('width', '150')
        imga.appendChild(image)
            //imga.setAttribute('href', '#')
        imga.setAttribute('data-index', index)
        imga.setAttribute('onmouseover', 'displayDesc(this)');
        imga.setAttribute('onmouseout', 'hideDesc(this)');
        div.appendChild(imga)

        var title = document.createElement('h2')
        title.appendChild(document.createTextNode(book.title))
        div.appendChild(title)
        var author = document.createElement('h3')
        author.appendChild(document.createTextNode('by ' + book.author))
        div.appendChild(author)
        var price = document.createElement('h2')
        price.className = 'price'
        price.appendChild(document.createTextNode('Rs. ' + book.price))
        div.appendChild(price)

        var addToCart = document.createElement('button')
        addToCart.setAttribute('data-index', index)
        addToCart.appendChild(document.createTextNode('Add to Cart'))
        addToCart.setAttribute('onclick', 'addToCart(this)')
        div.appendChild(addToCart)


        container.appendChild(div);
        // console.log(book.quantity)
    })


}

function cartCount() {
    db.transaction(function(tx) {
        tx.executeSql('select sum(quantity) as count from cart', [], function(tx, results) {
            var count = results.rows.item(0).count
                //console.log(`results.rows.item(0).sum(quantity)`)
                //console.log(count)
            if (count == null) {
                document.getElementById('cartCount').innerHTML = '[0]'

            } else {
                document.getElementById('cartCount').innerHTML = '[' + count + ']'
            }
        })
    })


}


function displayDesc(img) {
    var index = img.getAttribute('data-index')
    var desc = document.getElementsByClassName('description')[index]
    desc.style.display = 'block'
        // console.log(desc)
}

function hideDesc(img) {
    var index = img.getAttribute('data-index')
    var desc = document.getElementsByClassName('description')[index]
    desc.style.display = 'none'
}


function addToCart(book) {
    let index = book.getAttribute('data-index');
    var item = books[index];

    db.transaction(function(tx) {
        var query = "select quantity from cart where name = '" + item.title + "'"
        tx.executeSql(query, [], function(tx, results) {
            if (results.rows.length == 0) {
                tx.executeSql('insert into cart values(?,?,?,?)', [item.title, item.price, 1, item.price])
            } else {
                var qty = results.rows.item(0).quantity
                    //console.log(qty)
                tx.executeSql('update cart set quantity = ?, amount = ? where name = ?', [(qty + 1), (item.price * (qty + 1)), item.title])
            }
        })
    })


    localStorage.setItem('cart', JSON.stringify(cartList));
    document.getElementsByTagName('button')[index].innerText = "Added";
    setTimeout(function() {
        document.getElementsByTagName('button')[index].innerText = "Add to Cart"
    }, 3000)
    cartCount()
}


function loadCartData() {

    calculateTotal()
    cartCount();
    var table = document.getElementById('cartTable')
    table.innerHTML = ""
    var header = table.createTHead();
    var row = header.insertRow();
    row.insertCell().innerHTML = "<b>Book Title</b>";
    row.insertCell().innerHTML = "<b>Price</b>"
    row.insertCell().innerHTML = "<b>Quantity</b>"
    row.insertCell().innerHTML = "<b>Amount</b>"
    row.insertCell().innerHTML = "<b>Remove</b>"
    var tbody = table.createTBody();



    db.transaction(function(tx) {
        tx.executeSql('select * from cart', [], function(tx, results) {
            var numRows = results.rows.length
            for (var i = 0; i < numRows; i++) {
                //console.log(results.rows.item(i).name)
                var title = results.rows.item(i).name;
                var price = results.rows.item(i).price;
                var quantity = results.rows.item(i).quantity;
                var amount = results.rows.item(i).amount
                var row = tbody.insertRow();
                row.insertCell().innerHTML = title
                row.insertCell().innerHTML = price
                row.insertCell().innerHTML = quantity
                row.insertCell().innerHTML = amount
                var button = document.createElement('button');
                button.setAttribute('data-index', title);
                button.setAttribute('onclick', 'removeBook(this)');
                button.appendChild(document.createTextNode('Remove'));
                row.insertCell().appendChild(button);
            }
        })
    })

}

function removeBook(book) {
    var index = book.getAttribute('data-index');
    db.transaction(function(tx) {
        tx.executeSql('delete from cart where name = ?', [index])
    })

    cartCount();
    loadCartData();
    calculateTotal();
}

function calculateTotal() {
    db.transaction(function(tx) {
        tx.executeSql('select sum(amount) as total from cart', [], function(tx, results) {
            // console.log(results.rows.item(0).total)
            var price = results.rows.item(0).total
                // console.log(price)
            if (price == null) {
                document.getElementById('total').innerHTML = 'The cart is empty, add some items from the list. Click on Home'
            } else {
                var total = document.getElementById('total')
                total.innerHTML = 'Your total amount is Rs. ' + price
                var a = document.createElement('a')
                a.setAttribute('href', '#')
                    // var payButton = document.createElement('button')
                a.setAttribute('onclick', "location.href='purchase.html'")
                a.appendChild(document.createTextNode('Procced to Checkout'))
                    // a.appendChild(payButton)
                total.appendChild(document.createElement('br'))
                total.appendChild(a)
                window.sessionStorage.setItem('amount', price)
            }
        })
    })

    //console.log(purchaseAmount)
}

function checkout() {
    var amount
    cartCount();
    if (window.sessionStorage.getItem('amount')) {
        amount = window.sessionStorage.getItem('amount');
        document.getElementById('purchaseAmount').innerHTML = 'Total amount payable = Rs. ' + amount;
        document.getElementById('payNow').onclick = function() {

            if (document.getElementById('cardnum').value.length != 0 && cvvValidate()) {
                document.getElementById('cartTable').innerHTML = ""
                document.getElementById('purchaseAmount').innerHTML = 'Payment Successful <br> Your Order is confirmed and it will be shipped in 3 working days'
                document.getElementById('payNow').style.display = "none"
            } else {
                alert('Enter the required values correctly')
            }
        }


    } else {
        document.getElementById('purchaseAmount').innerHTML = 'Session timed out. Redirecting back to Cart'
        document.getElementById('cartTable').innerHTML = ""
        setTimeout(function() {
            window.location.replace('cart.html')
        }, 3000)
    }

    console.log(document.title)
}

function cardformat() {
    var num = document.getElementById('cardnum').value
    if (num.length != 16) {
        alert('Incorrect Card Number, Please enter correct 16 digit number')
        var num = document.getElementById('cardnum').value = ""
    } else {
        var temp = num.match(/.{1,4}/g)
        document.getElementById('cardnum').value = temp.join(' ')
    }
}

function cvvValidate() {
    var cvv = document.getElementById('cvv').value
    if (cvv.length != 3 || isNaN(parseInt(cvv))) {
        alert('Invalid CVV. Enter correctly')
        document.getElementById('cvv').value = ""
        return false
    }
    return true
}