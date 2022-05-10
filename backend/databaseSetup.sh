#!/bin/bash

mysql <<EOF
CREATE DATABASE IF NOT EXISTS offchain;
USE offchain;
CREATE TABLE IF NOT EXISTS linkdata(ID varchar(255), offdata varchar(255));
CREATE USER IF NOT EXISTS 'ubuntu'@'localhost' IDENTIFIED BY 'meme';
GRANT ALL PRIVILEGES ON offchain.linkdata TO 'ubuntu'@'localhost';
EOF
