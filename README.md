To start frontend server run 
```
cd client
npm install
npm start
```

To start backend server run
```
cd server
pip3 install -r requirements.txt
python3 manage.py makemigrations graphqlApp
python3 manage.py migrate
python3 manage.py runserver
```