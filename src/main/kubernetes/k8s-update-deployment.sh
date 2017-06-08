#!/usr/bin/env bash

kops export kubecfg --state @kubecfgState@ --name @kubecfgName@

kubectl set image deployment/ap-iat-deployment ap-iat=@dockerTagBase@/ap-iat:@version@
