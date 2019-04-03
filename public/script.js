var app = new Vue({
  el: '#app',
    data: {
        addDate: '',
        addTime: '',
        addType: '',
        addDescription: '',
        findItem: null,
        agenda: {},

    },

    created() {
        this.getItem();
    },

    methods: {

        async getItem() {
            try {
                let response = await axios.get("http://localhost:3000/api/items");
                this.agenda = response.data;
                return true;
            } catch (error) {
                console.log(error);
            }
        },

        async addItem() {
            try {
                let response = await axios.post("http://localhost:3000/api/items", {
                    date: this.addDate,
                    time: this.addTime,
                    type: this.addType,
                    description: this.addDescription,
                });
                this.addDate = '';
                this.addTime = '';
                this.addType = '';
                this.addDescription = '';
                this.getItem();
                return true;
            } catch (error) {
                console.log(error);
            }
        },
        async deleteItem(item) {
            try {
                let response = axios.delete("http://localhost:3000/api/items/" + item.id);
                this.getItem();
                return true;
            } catch (error) {
                console.log(error);
            }
        },
        async editItem(item) {
            try {
                let response = await axios.put("http://localhost:3000/api/items/" + item._id, {
                    date: this.findItem.date,
                    time: this.findItem.time,
                    type: this.findItem.type,
                    description: this.findItem.description,
                });
                this.findItem = null;
                this.getItems();
                return true;
            } catch (error) {
                console.log(error);
            }
        },

      
    }
});