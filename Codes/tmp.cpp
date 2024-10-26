/*

输入一个字符s,例如：abc123def456,
返回里面所有数字的和

*/






#include <iostream>
#include <cstring>
#include <ctype.h>
#include <vector>

using namespace std;


string s;
vector<int> nums;
int main(){
	cin >>s;
	int p=0,tmp=0;
	for(int i=0;i<s.size();i++){
		
		if(isdigit(s[i])!=0){  
            /*
            isdigit() 判断单个字符是否为数字，
            如果是数字返回!=0
            
            */
			if(tmp==0){
				p=i;
				tmp++;
			}
			else{
				tmp++;
			}
			
		}
		else{
			
			if(tmp>0){
				nums.push_back(stoi(s.substr(p,tmp)));
                /*
                
                可用stoi -> string to int将字符转为int
                可用to_string(int)将数字类型转为string
                string.substr(a,b)-> string[a:a+b],
                a表示起始下表，b表示往后几个
                
                */


				tmp=0;
				
			}
		}
	}
	if (tmp>0){
		nums.push_back(stoi(s.substr(p,tmp)));
		tmp=0;
	}
	
	int ans=0;
	for(int i=0;i<nums.size();i++){
		ans+=nums[i];
	}
	
	cout <<ans<<endl;
	return 0;
}