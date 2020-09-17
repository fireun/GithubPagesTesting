class Menu {
    constructor(id){
        //获得资料
        this.box = document.querySelector(id)
        this.ul = this.box.querySelector("ul")
        this.lis = this.box.querySelector("li")
        this.subMenuEles = this.box.querySelector(".sub-menu")
         
        this.time1 = null
        this.time2 = null

        this.inti()

    }
  
    // inti 初始化 -method
    inti(){ 
        console.log("menu")  
        
        // 监听
        this.lis.forEach((item) => {
            item.addEventListener("mouseenter", (e) => {
                let li = e.target
                console.log("mouseenter")

                if(this.time1 != null){
                    clearTimeout(this.time1)
                }

                /*转换 css */
                this.time1 = setTimeout(() => {
                    this.subMenuEles.forEach((item) => {
                        item.classList.remove("active")
                    })
                    li.children[1].classList.add("active")
                },200)
            })
        });

        this.lis.forEach((item) => {
            item.addEventListener("mouseleave", (e) => {
                let li = e.target
                console.log("mouseleave")

                if(this.time2 != null){
                    clearTimeout(this.time2)
                }

                this.time2 = setTimeout(() => {
                    li.children[1].classList.remove("active")
                },200)
            })
        });
    }
}

//完善分类导航栏的 css default hover时间
//定义一个类(class) 名字第一个一定要大写 

