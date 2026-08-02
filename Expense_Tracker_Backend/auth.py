from jose import jwt,JWTError
from fastapi.security import OAuth2PasswordBearer
from fastapi import Depends, HTTPException
from datetime import datetime,timedelta

OAuth2_Scheme = OAuth2PasswordBearer(tokenUrl="login") 

SECRET_KEY = 'kjdnkjjdncjdn'
ALGORITHM = "HS256"
ACCESS_TOKEN_MINUTES = 60

def create_access_token(data:dict):
    to_encode = data.copy()  #get data
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_MINUTES) # get expire time

    to_encode.update({'exp':expire}) # update expire time in data

    encoded_jwt = jwt.encode(
        to_encode,
        SECRET_KEY,
        algorithm = ALGORITHM
    )

    return encoded_jwt

def get_user_access(token : str = Depends(OAuth2_Scheme)):
    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )
        user_id = payload.get("user_id")

        if user_id is None:
            raise HTTPException(status_code=401 , detail="Invallid Token")
        return user_id

    except JWTError:
        raise HTTPException(status_code=401 , detail="Invalid token or token expired")

