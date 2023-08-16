import boto3
# import configparser
# import os
# from pathlib import Path
from flask import session
from flask_session import Session

# path = Path(__file__)
# ROOT_DIR = path.parent.absolute()
# config_path = os.path.join(ROOT_DIR, "config.ini")

def get_s3_client():
    # config = configparser.ConfigParser()
    # config.read(config_path)

    # aws_access_key_id = config.get('aws', 'aws_access_key_id')
    # aws_secret_access_key = config.get('aws', 'aws_secret_access_key')

    aws_access_key_id = session.get("aws_access_key_id")
    aws_secret_access_key = session.get("aws_secret_access_key")

    s3 = boto3.client('s3', aws_access_key_id=aws_access_key_id, aws_secret_access_key=aws_secret_access_key)
    return s3

def get_all_buckets():
    s3 = get_s3_client()
    response = s3.list_buckets()
    buckets = response['Buckets']
    return buckets

def get_all_objects():
    s3 = get_s3_client()
    buckets = get_all_buckets()
    all_objects = []

    for bucket in buckets:
        objects = s3.list_objects(Bucket=bucket['Name'])
        if 'Contents' in objects:
            for obj in objects['Contents']:
                obj_with_bucket = {
                    'Bucket': bucket['Name'],
                    'Key': obj['Key'],
                    'Size': obj['Size'], 
                    'Owner': obj['Owner']['DisplayName']
                }
                all_objects.append(obj_with_bucket)
    return all_objects

def get_object_permissions():
    s3 = get_s3_client()
    objects = get_all_objects()
    all_permissions = []

    for obj in objects:
        permissions = s3.get_object_acl(Bucket=obj['Bucket'], Key=obj['Key'])
        obj_permissions = {
            'Bucket': obj['Bucket'],
            'Key': obj['Key'],
            'Size': obj['Size'],
            'Owner': obj['Owner'],
            'Permissions': permissions['Grants']
        }
        all_permissions.append(obj_permissions)

    return all_permissions